/* TODO:

1. 
*/
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
      
      editorTracker.widgetAdded.connect(
        () => {
            console.log("edi");
        }
      );

      let body = document.getElementsByTagName("body")[0];
      let completerWidget = document.createElement('div');
      completerWidget.className = 'jp-Completer jp-HoverBox';
      body.appendChild(completerWidget);

      let ul = document.createElement('ul');
      ul.className = 'jp-Completer-list';

      completerWidget.appendChild(ul);
      completerWidget.style.display = "none";

      let currActiveOption = 0;

      function navigateCompleter(e: KeyboardEvent) {
        // console.log("a key has been pressed");
        // press up key
        if (e.keyCode === 38 && completerWidget.style.display != "none") {
          e.preventDefault();
          e.stopPropagation();
        //   console.log("up");
          ul.children[currActiveOption].classList.remove("jp-mod-active");
          if (currActiveOption != 0)
          currActiveOption -= 1;
          ul.children[currActiveOption].classList.add("jp-mod-active");
        }
      
        // press down key
        // this moves the cursor 
        if (e.keyCode == 40 && completerWidget.style.display != "none") {
          e.preventDefault();
          e.stopPropagation();
        //   console.log("down");
          ul.children[currActiveOption].classList.remove("jp-mod-active");
          if (currActiveOption < ul.children.length-1)
          currActiveOption += 1;
          ul.children[currActiveOption].classList.add("jp-mod-active");
        }
      
        // press right key
        if (e.keyCode == 39 && completerWidget.style.display != "none") {
          e.preventDefault();
          e.stopPropagation();
          completerWidget.style.display = "none";
          body.removeEventListener('keydown', navigateCompleter);
          currActiveOption = 0;
        }

        if (e.keyCode == 13 && completerWidget.style.display != "none") {
          console.log("enter");
          e.stopPropagation();
          e.preventDefault();
          completerWidget.style.display = "none";
          body.removeEventListener('keydown', navigateCompleter);
          currActiveOption = 0;
          // replace cursor word with new word
        }
      }


      app.commands.addCommand(CommandIDs.invokeNotebook, {
        execute: () => {
        console.log("WWWW invoke notebook command pressed");
          console.log("editortrack node: ", editorTracker.currentWidget?.node);
          
            let node = editorTracker?.currentWidget?.node;

            while (ul.firstChild) {
              ul.removeChild(ul.firstChild);
            }

            let sidePanel = Array.from(document.getElementsByClassName("lm-Widget p-Widget lm-TabBar p-TabBar jp-SideBar jp-mod-left lm-BoxPanel-child p-BoxPanel-child")as HTMLCollectionOf<HTMLElement>);
            let sidePanelWidth = sidePanel[0].style.width.slice(0,-2);
            
            // console.log("sidePanelW: ", sidePanelWidth);


            let cursors = Array.from(node?.getElementsByClassName('CodeMirror-cursor') as HTMLCollectionOf<HTMLElement>)
            // let cursorsDiv = Array.from(body.getElementsByClassName('CodeMirror-cursors') as HTMLCollectionOf<HTMLElement>)
            // for (let i=0; i < cursorsDiv.length; i++) {
            //   console.log("cursorsDiv: ", cursorsDiv[i].style.visibility);
            // }
            console.log("cursors: ", cursors);
            for (let i = 0; i < cursors.length; i++) {
              // if (cursorsDiv[i].style.visibility == "hidden") {
              //   console.log("cursordv top and left: ", i, " ", cursors[i].style.top, cursors[i].style.left);

              //   // console.log("completerdv top and left: ",i, " ", completerWidget.style.top, completerWidget.style.left);
              // }
              if (cursors[i].style.height != '0px') {
                // console.log("cursors ", i, " ", cursors[i].style);
                console.log("cursor top and left: ", i, " ", cursors[i].style.top, cursors[i].style.left);
                console.log("rect top and left: ", cursors[i].getBoundingClientRect().top, cursors[i].getBoundingClientRect().left);
                let rect = cursors[i].getBoundingClientRect();
                
                // completerWidget.style.top = topPanelHeight + cursors[i].style.top;
                // completerWidget.style.left = sidePanelWidth + cursors[i].style.left;
                completerWidget.style.top = rect.top.toString() + "px";
                let leftPixel = parseInt(sidePanelWidth) + rect.left
                // console.log("leftPixel, ", leftPixel);
                completerWidget.style.left = leftPixel.toString() + "px";
                console.log("completer top and left: ",i, " ", completerWidget.style.top, completerWidget.style.left);
              }
            }

            console.log("ENDENDENDEND")

            // console.log("cursor: ", cursors);
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

            body.addEventListener('keydown', navigateCompleter);

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

          const id = editorTracker.currentWidget && editorTracker.currentWidget.id;
  
          if (id) {
            return app.commands.execute(CommandIDs.select, { id });
          }
        },
      });

      app.commands.addKeyBinding({
        command: CommandIDs.invokeNotebook, // id of the command to execute when the binding is matched
        keys: ['Accel L'], // default key sequence for the key binding
        selector: ".jp-FileEditor .jp-mod-completer-enabled", // CSS Selector for the key binding
      });
    }
  };
  
  
  export default extension;
  