/* TODO:

2. how to prevent default key events
4. replace word with word in autocompleter
*/
import {
    JupyterFrontEnd,
    JupyterFrontEndPlugin
  } from '@jupyterlab/application';
  
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

  /**
 * The command IDs used by the console plugin.
 */
  namespace CommandIDs {
    // export const invoke = 'completer:invoke';

    // export const invokeNotebook = 'completer:invoke-file-editor';

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
      body.className = 'body';
      let completerWidget = document.createElement('div');
      completerWidget.className = 'jp-Completing';
    //   completerWidget.id = 'completer-widget';
      body.appendChild(completerWidget);

    //   let ul = document.createElement('ul');
    //   ul.className = 'jp-Completer-list';
    //   ul.id = 'completer-list';

    //   completerWidget.appendChild(ul);
    //   completerWidget.style.display = "none";

    //   let currActiveOption = 0;

    //   let keywordsList = ['impScience', 'impMagic', 'imply', 'life', 'living', 'lifoo', 'danger', 'danish']; 

    //   function completerKeyboardNav(e: KeyboardEvent) {
    //     // console.log("a key has been pressed");
    //     // press up key
    //     // e.preventDefault();
    //     // e.stopPropagation();
    //     if (e.key === "ArrowUp" && completerWidget.style.display != "none") {
    //       e.preventDefault();
    //       // e.stopImmediatePropagation();
    //       console.log("up");
    //       ul.children[currActiveOption].classList.remove("jp-mod-active");
    //       if (currActiveOption != 0) {
    //         currActiveOption -= 1;
    //       } else {
    //         currActiveOption = ul.children.length-1;
    //       }
    //       ul.children[currActiveOption].classList.add("jp-mod-active");
    //     }
      
    //     // press down key
    //     // this moves the cursor 
    //     if (e.key == "ArrowDown" && completerWidget.style.display != "none") {
    //       e.preventDefault();
    //       // e.stopImmediatePropagation();
    //       console.log("down");
    //       ul.children[currActiveOption].classList.remove("jp-mod-active");
    //       if (currActiveOption < ul.children.length-1){
    //         currActiveOption += 1;
    //       } else {
    //         currActiveOption = 0;
    //       }
    //       ul.children[currActiveOption].classList.add("jp-mod-active");
    //     }
      
    //     // press right key
    //     if (e.key == "ArrowRight" && completerWidget.style.display != "none") {
    //       console.log("right");
    //       e.preventDefault();
    //       // e.stopImmediatePropagation();
    //       completerWidget.style.display = "none";
    //       body.removeEventListener('keydown', completerKeyboardNav);
    //       currActiveOption = 0;
    //       body.removeEventListener('click', completerClickEvents);
    //     }

    //     // press enter key
    //     if (e.key == "Enter" && completerWidget.style.display != "none") {
    //       console.log("enter");
    //       // e.stopImmediatePropagation();
    //       e.preventDefault();
    //       completerWidget.style.display = "none";
    //       body.removeEventListener('keydown', completerKeyboardNav);
    //       currActiveOption = 0;
    //       body.removeEventListener('click', completerClickEvents);
    //       // replace cursor word with new word
    //     }
    //     // return false;
    //   }

    //   function completerClickEvents(e:MouseEvent) {
    //     if (completerWidget.style.display != "none" && completerWidget.contains(e.target as Node)) {
    //       completerWidget.style.display = "none";
    //       body.removeEventListener('keydown', completerKeyboardNav);
    //       currActiveOption = 0;
    //       body.removeEventListener('click', completerClickEvents);
    //     }
    //   } 

    //   function createCompleterEntry(keyword: string, isFirstEntry: boolean) {
    //     let li = document.createElement('li');
    //     if (isFirstEntry){
    //       li.className = "jp-Completer-item jp-mod-active";
    //     } else {
    //       li.className = "jp-Completer-item";
    //     }
    //     ul.appendChild(li);
    //     let code = document.createElement('code');
    //     code.className = "jp-Completer-match";
    //     code.innerHTML = keyword;
    //     li.appendChild(code);
    //   }

    //   app.commands.addCommand(CommandIDs.invokeNotebook, {
    //     execute: () => {
    //         while (ul.firstChild) {
    //           ul.removeChild(ul.firstChild);
    //         }

    //         let node = editorTracker?.currentWidget?.node;
    //         console.log("node: ", node);

    //         // console.log("selected text: ", selectedText);
    //         let sidePanel = Array.from(document.getElementsByClassName("lm-Widget p-Widget lm-TabBar p-TabBar jp-SideBar jp-mod-left lm-BoxPanel-child p-BoxPanel-child")as HTMLCollectionOf<HTMLElement>);
    //         let sidePanelWidth = sidePanel[0].style.width.slice(0,-2);

    //         let cursors = Array.from(node?.getElementsByClassName('CodeMirror-cursor') as HTMLCollectionOf<HTMLElement>)

    //         for (let i = 0; i < cursors.length; i++) {
    //           if (cursors[i].style.height != '0px') {
    //             let cursorLocation = cursors[i].getBoundingClientRect();
    //             completerWidget.style.top = cursorLocation.top.toString() + "px";
    //             let leftPixel = parseInt(sidePanelWidth) + cursorLocation.left;
    //             completerWidget.style.left = leftPixel.toString() + "px";
    //           }
    //         }

    //         completerWidget.style.display = "flex";

    //         let startingLetters = "imp";   
    //         for (let i = 0; i < keywordsList.length; i++) {
    //           if (keywordsList[i].startsWith(startingLetters)) {
    //             // creates an entry in the autocomplete tooltip
    //             if (i == 0)
    //               createCompleterEntry(keywordsList[i], true);
    //             else 
    //               createCompleterEntry(keywordsList[i], false);
    //           }
    //         }

    //         document.addEventListener('keydown', completerKeyboardNav);
    //         document.addEventListener("click", completerClickEvents);

    //     },
    //   });

      app.commands.addCommand(CommandIDs.testCommand, {
        execute: () => {
          console.log("test command has been triggered");
        },
      });

      app.commands.addKeyBinding({
        command: CommandIDs.testCommand, // id of the command to execute when the binding is matched
        keys: ['Accel L'], // default key sequence for the key binding
        selector: ".jp-FileEditor .jp-Completing", // CSS Selector for the key binding
      });

    //   app.commands.addKeyBinding({
    //     command: CommandIDs.invokeNotebook, // id of the command to execute when the binding is matched
    //     keys: ['Accel L'], // default key sequence for the key binding
    //     selector: ".jp-FileEditor .jp-mod-completer-enabled", // CSS Selector for the key binding
    //     // selector: ".jp-FileEditor", // CSS Selector for the key binding

    //   });
    }
  };
  
  
  export default extension;
  