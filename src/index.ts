/* TODO:

2. how to prevent default key events
4. replace word with word in autocompleter
*/
import {
    JupyterFrontEnd,
    JupyterFrontEndPlugin
  } from '@jupyterlab/application';

import {getWord} from "./functions.js";

import { ICommandPalette} from '@jupyterlab/apputils';
// import { CodeConsole } from '@jupyterlab/console';
//   import { MainAreaWidget } from '@jupyterlab/apputils';

//   import { Widget } from '@lumino/widgets';
  // import { Message } from '@lumino/messaging';
//   import { CodeMirrorEditor } from '@jupyterlab/codemirror';
// import { CodeEditor } from '@jupyterlab/codeeditor';
import { IEditorTracker} from '@jupyterlab/fileeditor';
//   import { HoverBox } from '@jupyterlab/apputils'; 
// import { HoverBox.IOptions } from "@jupyterlab/apputils";
// import {IDocumentWidget} from '@jupyterlab/docregistry';
  /**
 * The command IDs used by the console plugin.
 */
  namespace CommandIDs {
    // export const invoke = 'completer:invoke';

    export const invokeNotebook = 'completer:invoke-file-editor';

    // export const select = 'completer:select';

    // export const up = 'completer:up';
    // export const down = 'completer:down';
    // export const right = 'completer:right';

    export const testCommand = 'command:test';

    // export const selectNotebook = 'completer:select-file-editor';
  }



  /**
   * Initialization data for the jupyterlab_apod2 extension.
   */
  const extension: JupyterFrontEndPlugin<void> = {
    id: 'jupyterlab_apod2:plugin',
    autoStart: true,
    requires: [ICommandPalette, IEditorTracker],
    activate: async (app: JupyterFrontEnd, palette: ICommandPalette, editorTracker: IEditorTracker) => {
      console.log(' JupyterLab extension jupyterlab_apod2 is activated!');

      let body = document.getElementsByTagName("body")[0];
      let completerWidget = document.createElement('div');
      completerWidget.className = 'jp-Completer jp-HoverBox';
      completerWidget.id = 'completer-widget';
      body.appendChild(completerWidget);

      let ul = document.createElement('ul');
      ul.className = 'jp-Completer-list';
      ul.id = 'completer-list';

      completerWidget.appendChild(ul);
      completerWidget.style.display = "none";

      let currActiveOption = 0;

      let keywordsList = ['impScience', 'impMagic', 'imply', 'life', 'living', 'lifoo', 'danger', 'danish']; 

      function completerKeyboardNav(e: KeyboardEvent) {
        // console.log("a key has been pressed");
        if (completerWidget.style.display != "none") {
          e.preventDefault();
          e.stopPropagation();
          e.stopImmediatePropagation();
          console.log("completer widget has appeared");
          // press up key
          if (e.key === "w") {
            console.log("up");
            ul.children[currActiveOption].classList.remove("jp-mod-active");
            if (currActiveOption != 0) {
              currActiveOption -= 1;
            } else {
              currActiveOption = ul.children.length-1;
            }
            ul.children[currActiveOption].classList.add("jp-mod-active");
          }
          // press down key
          // this moves the cursor 
          else if (e.key == "ArrowDown") {
            // e.preventDefault();
            console.log("down");
            ul.children[currActiveOption].classList.remove("jp-mod-active");
            if (currActiveOption < ul.children.length-1){
              currActiveOption += 1;
            } else {
              currActiveOption = 0;
            }
            ul.children[currActiveOption].classList.add("jp-mod-active");
          }
          // press right key
          else if (e.key == "ArrowRight") {
            console.log("right");
            completerWidget.style.display = "none";
            body.removeEventListener('keydown', completerKeyboardNav);
            currActiveOption = 0;
            body.removeEventListener('click', completerClickEvents);
          }
          // press enter key
          else if (e.key == "Enter") {
            completerWidget.style.display = "none";
            body.removeEventListener('keydown', completerKeyboardNav);
            currActiveOption = 0;
            body.removeEventListener('click', completerClickEvents);
            // replace cursor word with new word
          }
        }
      }

      function completerClickEvents(e:MouseEvent) {
        if (completerWidget.style.display != "none" && !completerWidget.contains(e.target as Node)) {
          completerWidget.style.display = "none";
          body.removeEventListener('keydown', completerKeyboardNav);
          currActiveOption = 0;
          body.removeEventListener('click', completerClickEvents);
        }
      } 

      function createCompleterEntry(keyword: string, isFirstEntry: boolean) {
        let li = document.createElement('li');
        if (isFirstEntry){
          li.className = "jp-Completer-item jp-mod-active";
        } else {
          li.className = "jp-Completer-item";
        }
        ul.appendChild(li);
        let code = document.createElement('code');
        code.className = "jp-Completer-match";
        code.innerHTML = keyword;
        li.appendChild(code);
      }



      app.commands.addCommand(CommandIDs.invokeNotebook, {
        execute: () => {

            while (ul.firstChild) {
              ul.removeChild(ul.firstChild);
            }

            let node = editorTracker?.currentWidget?.node;

            console.log("node: ", node);
 

            let sidePanel = Array.from(document.getElementsByClassName("lm-Widget p-Widget lm-TabBar p-TabBar jp-SideBar jp-mod-left lm-BoxPanel-child p-BoxPanel-child")as HTMLCollectionOf<HTMLElement>);
            let sidePanelWidth = sidePanel[0].style.width.slice(0,-2);

            let cursors = Array.from(node?.getElementsByClassName('CodeMirror-cursor') as HTMLCollectionOf<HTMLElement>)

            for (let i = 0; i < cursors.length; i++) {
              if (cursors[i].style.height != '0px') {
                let cursorLocation = cursors[i].getBoundingClientRect();
                completerWidget.style.top = cursorLocation.top.toString() + "px";
                let leftPixel = parseInt(sidePanelWidth) + cursorLocation.left;
                completerWidget.style.left = leftPixel.toString() + "px";
              }
            }

            completerWidget.style.display = "flex";

            let text = node?.getElementsByClassName("CodeMirror-line");
            if (text) {
              let content = "";
              for (let i = 0; i < text.length; i++) {
                content += text[i].textContent + '\n';
              }
              console.log("content: ");
              console.log(content);
            } else {
              return;
            }

            let startingLetters = "imp";   
            for (let i = 0; i < keywordsList.length; i++) {
              if (keywordsList[i].startsWith(startingLetters)) {
                // creates an entry in the autocomplete tooltip
                if (i == 0)
                  createCompleterEntry(keywordsList[i], true);
                else 
                  createCompleterEntry(keywordsList[i], false);
              }
            }


            // document.addEventListener('keydown', completerKeyboardNav);
            document.addEventListener("click", completerClickEvents);

        },
      });

      app.commands.addCommand(CommandIDs.testCommand, {
        execute: () => {console.log("test command callled");}
      });

      // console.log("document selection: ", document.getSelection());

      document.addEventListener('keydown', function(e) {
        // let selection = window.getSelection();
        // // let selectedText = selection?.getRangeAt(0);
        // let range = selection?.getRangeAt(0);
        // console.log("get ssdf range: ", range?.startOffset);
        // console.log("get esdf range: ", range?.endOffset);
        // console.log("selected text: ", selection?.toString());
        getWord(e);
      });

      // document.addEventListener('mouseup', function(e) {
        
      //   let selection = window.getSelection();
      //   let range = selection?.getRangeAt(0);
      //   console.log('range: ', range); 
      //   // selection?.modify("extend", "backward", "word");
      //   // let selectedText = selection?.getRangeAt(0);
      //   console.log("get ssdf range: ", range?.startOffset);
      //   console.log("get esdf range: ", range?.endOffset);
      //   range?.deleteContents();
      //   console.log("selected text: ", selection?.toString());
      // });


      app.commands.addKeyBinding({
        command: CommandIDs.testCommand, // id of the command to execute when the binding is matched
        keys: ['Accel H'], // default key sequence for the key binding
        selector: ".jp-Completer", // CSS Selector for the key binding
      });

      app.commands.addKeyBinding({
        command: CommandIDs.invokeNotebook, // id of the command to execute when the binding is matched
        keys: ['Accel L'], // default key sequence for the key binding
        selector: ".jp-FileEditor .jp-mod-completer-enabled", // CSS Selector for the key binding
        // selector: ".jp-FileEditor", // CSS Selector for the key binding

      });
    }
  };
  
  
  export default extension;
  