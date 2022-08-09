import {
    JupyterFrontEnd,
    JupyterFrontEndPlugin
  } from '@jupyterlab/application';
  
import { ICommandPalette} from '@jupyterlab/apputils';
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
    export const invoke = 'completer:invoke';

    export const invokeNotebook = 'completer:invoke-file-editor';

    export const select = 'completer:select';

    export const up = 'completer:up';
    export const down = 'completer:down';
    export const right = 'completer:right';

    export const selectNotebook = 'completer:select-file-editor';
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
      
      // let keywordsList = ['import', 'importMagic', 'imply', 'life', 'living', 'lifoo', 'danger', 'danish'] 
      editorTracker.widgetAdded.connect(
        () => {
            console.log("editorCnotent: ", editorTracker.currentWidget?.content);
        }
      );

      let body = document.getElementsByTagName("body")[0];
      let completerWidget = document.createElement('div');
      completerWidget.className = 'jp-Completer jp-HoverBox';
      body.appendChild(completerWidget);

      // let completerWidget = document.getElementsByClassName("jp-Completer")[0];
      let ul = document.createElement('ul');
      ul.className = 'jp-Completer-list';

      completerWidget.appendChild(ul);
      completerWidget.style.display = "none";

      let currActiveOption = 0;

      app.commands.addCommand(CommandIDs.invokeNotebook, {
        execute: () => {
        console.log("WWWW invoke notebook command pressed");

            while (ul.firstChild) {
              console.log("child: ", ul.firstChild);
              ul.removeChild(ul.firstChild);
            }
            completerWidget.style.display = "flex";
            // creates an entry in the autocomplete tooltip
            let li = document.createElement('li');
            li.className = "jp-Completer-item jp-mod-active";
            ul.appendChild(li);
            let code = document.createElement('code');
            code.className = "jp-Completer-match";
            code.innerHTML = "impMagic";
            li.appendChild(code);

            let li2 = document.createElement('li');
            li2.className = "jp-Completer-item";
            ul.appendChild(li2);
            let code2 = document.createElement('code');
            code2.className = "jp-Completer-match";
            code2.innerHTML = "impScience";
            li2.appendChild(code2);


        },
      });
  
      // Add notebook completer select command.
      /*
        commands are lightweight objects that include a function 
        to execute combined with additional metadata
      */
      app.commands.addCommand(CommandIDs.selectNotebook, {
        execute: () => {
          console.log("WWWW select editor command selected");
  
          // press enter key
          if (completerWidget.style.display != "none") {
            //   console.log("enter");
              completerWidget.style.display = "none";
              currActiveOption = 0;
              // replace cursor word with new word
            }
          const id = editorTracker.currentWidget && editorTracker.currentWidget.id;
  
          if (id) {
            return app.commands.execute(CommandIDs.select, { id });
          }
        },
      });

      app.commands.addCommand(CommandIDs.up, {
        execute: () => {
          console.log("WWWW up command selected");

          if (completerWidget.style.display != "none") {
              ul.children[currActiveOption].classList.remove("jp-mod-active");
              if (currActiveOption != 0)
              currActiveOption -= 1;
              ul.children[currActiveOption].classList.add("jp-mod-active");
          }
        },
      });

      app.commands.addCommand(CommandIDs.right, {
        execute: () => {
          console.log("WWWW right command selected");
        if (completerWidget.style.display != "none") {
          completerWidget.style.display = "none";
          currActiveOption = 0;
        }
        },
      });

      app.commands.addCommand(CommandIDs.down, {
        execute: () => {
          console.log("WWWW down command selected");
        if (completerWidget.style.display != "none") {
            ul.children[currActiveOption].classList.remove("jp-mod-active");
            if (currActiveOption < ul.children.length-1)
            currActiveOption += 1;
            ul.children[currActiveOption].classList.add("jp-mod-active");
          }
        },
      });

      app.commands.addKeyBinding({
        command: CommandIDs.down, // id of the command to execute when the binding is matched
        keys: ['ArrowDown'], // default key sequence for the key bineding
        selector: ".jp-FileEditor .jp-mod-completer-enabled", // CSS Selector for the key binding
      });

      app.commands.addKeyBinding({
        command: CommandIDs.right, // id of the command to execute when the binding is matched
        keys: ['ArrowRight'], // default key sequence for the key bineding
        selector: ".jp-FileEditor .jp-mod-completer-enabled", // CSS Selector for the key binding
      });

      // find the right selector
      app.commands.addKeyBinding({
        command: CommandIDs.up, // id of the command to execute when the binding is matched
        keys: ['ArrowUp'], // default key sequence for the key bineding
        selector: ".jp-FileEditor .jp-mod-completer-enabled", // CSS Selector for the key binding
      });

      // app.commands.addKeyBinding({
      //   command: CommandIDs.selectNotebook, // id of the command to execute when the binding is matched
      //   keys: ['Enter'], // default key sequence for the key bineding
      //   selector: ".jp-FileEditor .jp-mod-completer-enabled", // CSS Selector for the key binding
      // });

      app.commands.addKeyBinding({
        command: CommandIDs.invokeNotebook, // id of the command to execute when the binding is matched
        keys: ['Accel L'], // default key sequence for the key binding
        selector: ".jp-FileEditor .jp-mod-completer-enabled", // CSS Selector for the key binding
      });
    }
  };
  
  
  export default extension;
  