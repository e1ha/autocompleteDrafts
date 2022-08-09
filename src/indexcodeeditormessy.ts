import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

import { ICommandPalette, MainAreaWidget } from '@jupyterlab/apputils';
// import { Widget } from '@lumino/widgets';
// import { Message } from '@lumino/messaging';
import { CodeMirrorEditor } from '@jupyterlab/codemirror';
import { CodeEditor, CodeEditorWrapper } from '@jupyterlab/codeeditor';

/**
 * Initialization data for the jupyterlab_apod2 extension.
 */
const extension: JupyterFrontEndPlugin<void> = {
  id: 'jupyterlab_apod2:plugin',
  autoStart: true,
  requires: [ICommandPalette],
  activate: (app: JupyterFrontEnd, palette: ICommandPalette) => {
    console.log(' JupyterLab extension jupyterlab_apod2 is activated!');

    // create the code editor widget
    const editorFactory = (options: CodeEditor.IOptions) => {
      return new CodeMirrorEditor(options);
    };
    let model = new CodeEditor.Model();
    const content = new CodeEditorWrapper({model, factory: editorFactory});
    const widget = new MainAreaWidget({ content });
    widget.id = 'ploomber-text-editor';
    widget.title.label = 'Text Editor';
    widget.title.closable = true;

    // Add an application command to the command palette
    const command: string = 'editor:open';
    app.commands.addCommand(command, {
      label: 'Text Editor',
      execute: () => {
        if (!widget.isAttached) {
           app.shell.add(widget, 'main');
         }
         app.shell.activateById(widget.id);
      }
    });
    palette.addItem({ command, category: 'editor' });

    // create the completer tooltip
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
    
    // creates an entry in the completer tooltip
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

    // handles clicking outside and inside of the tooltip
    function completerClickEvents(e:MouseEvent) {
      if (completerWidget.style.display != "none" && !completerWidget.contains(e.target as Node)) {
        completerWidget.style.display = "none";
        currActiveOption = 0;
        body.removeEventListener('click', completerClickEvents);
      }
    } 

    let wordBeforeCursor = ""
    document.addEventListener("keydown", function(e) {
      // trigger the completer
      let editor = content.editor;

      if (completerWidget.style.display == "none" && e.key == 'Tab') {

        while (ul.firstChild) {
          ul.removeChild(ul.firstChild);
        }

        let node = widget.node;

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

        let lineNum = editor.getSelection().start.line;
        let line = editor.getLine(lineNum);
        let endingInd = editor.getSelection().start.column;
        // get words from that line; from space to column number
        let lineTillCursor = line?.substring(0,endingInd+1);
        let wordArr = lineTillCursor?.split(" ");

        if (wordArr)
          wordBeforeCursor = wordArr[wordArr?.length -1]

        if (wordBeforeCursor != "") {
          e.preventDefault();
          e.stopPropagation();
          e.stopImmediatePropagation();
        }
        // console.log("word before cursor: ", wordBeforeCursor);
        // console.log("line: ", line);

        // EDGE CASE: STARTS WITH NONE 
        let firstEntry = true;
        for (let i = 0; i < keywordsList.length; i++) {
          if (keywordsList[i].startsWith(wordBeforeCursor)) {
            // creates an entry in the autocomplete tooltip
            if (firstEntry) {
              firstEntry = false;
              createCompleterEntry(keywordsList[i], true);
            }
            else 
              createCompleterEntry(keywordsList[i], false);
          } 
        }

        if (firstEntry) {
          for (let i = 0; i < keywordsList.length; i++) {
            if (firstEntry) {
              firstEntry = false;
              createCompleterEntry(keywordsList[i], true);
            }
            else 
              createCompleterEntry(keywordsList[i], false);
          }
        }
      }

      if (completerWidget.style.display != "none") {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        console.log("completer widget has appeared");
        // press up key
        if (e.key === "ArrowUp") {
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
        // else if (e.key == "ArrowRight") {
        //   console.log("right");
        //   completerWidget.style.display = "none";
        //   // body.removeEventListener('keydown', completerKeyboardNav);
        //   currActiveOption = 0;
        //   body.removeEventListener('click', completerClickEvents);
        // }
        // press enter key
        else if (e.key == "ArrowRight") {
          completerWidget.style.display = "none";
          // body.removeEventListener('keydown', completerKeyboardNav);
          currActiveOption = 0;
          body.removeEventListener('click', completerClickEvents);
          // replace cursor word with new word
          let textToReplace = ul.children[currActiveOption].textContent;
          if (textToReplace) {
            editor.replaceSelection?.(textToReplace.substring(wordBeforeCursor.length));
          }
        }
        document.addEventListener("click", completerClickEvents);

      }
    });
  }
};

export default extension;
