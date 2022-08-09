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
            console.log("WWWWW editor tracked");
        }
      );

    //   let OUTOFVIEW_CLASS = "jp-mod-outofview";
    //   let HOVERBOX_CLASS = "jp-HoverBox";

    // function setGeometry(options: IOptions): void {
    //     const { anchor, host, node, privilege } = options;
    
    //     // Add hover box class if it does not exist.
    //     node.classList.add(HOVERBOX_CLASS);
    
    //     // Hide the hover box before querying the DOM for the anchor coordinates.
    //     node.classList.add(OUTOFVIEW_CLASS);
    
    //     // If the current coordinates are not visible, bail.
    //     if (!host.contains(document.elementFromPoint(anchor.left, anchor.top))) {
    //         return;
    //     }
    
    //     // Clear any previously set max-height.
    //     node.style.maxHeight = '';
    
    //     // Clear any programmatically set margin-top.
    //     node.style.marginTop = '';
    
    //     // Make sure the node is visible so that its dimensions can be queried.
    //     node.classList.remove(OUTOFVIEW_CLASS);
    
    //     const style = options.style || window.getComputedStyle(node);
    //     const innerHeight = window.innerHeight;
    //     const spaceAbove = anchor.top;
    //     const spaceBelow = innerHeight - anchor.bottom;
    //     const marginTop = parseInt(style.marginTop!, 10) || 0;
    //     const minHeight = parseInt(style.minHeight!, 10) || options.minHeight;
    
    //     let maxHeight = parseInt(style.maxHeight!, 10) || options.maxHeight;
    
    //     // Determine whether to render above or below; check privilege.
    //     const renderBelow =
    //         privilege === 'forceAbove'
    //         ? false
    //         : privilege === 'forceBelow'
    //         ? true
    //         : privilege === 'above'
    //         ? spaceAbove < maxHeight && spaceAbove < spaceBelow
    //         : spaceBelow >= maxHeight || spaceBelow >= spaceAbove;
    
    //     if (renderBelow) {
    //         maxHeight = Math.min(spaceBelow - marginTop, maxHeight);
    //     } else {
    //         maxHeight = Math.min(spaceAbove, maxHeight);
    //         // If the box renders above the text, its top margin is irrelevant.
    //         node.style.marginTop = '0px';
    //     }
    //     node.style.maxHeight = `${maxHeight}px`;
    
    //     // Make sure the box ought to be visible.
    //     const withinBounds =
    //         maxHeight > minHeight &&
    //         (spaceBelow >= minHeight || spaceAbove >= minHeight);
    
    //     if (!withinBounds) {
    //         node.classList.add(OUTOFVIEW_CLASS);
    //         return;
    //     }
    
    //     // Position the box vertically.
    //     const offsetAbove =
    //         (options.offset &&
    //         options.offset.vertical &&
    //         options.offset.vertical.above) ||
    //         0;
    //     const offsetBelow =
    //         (options.offset &&
    //         options.offset.vertical &&
    //         options.offset.vertical.below) ||
    //         0;
    //     const top = renderBelow
    //         ? innerHeight - spaceBelow + offsetBelow
    //         : spaceAbove - node.getBoundingClientRect().height + offsetAbove;
    //     node.style.top = `${Math.floor(top)}px`;
    
    //     // Position the box horizontally.
    //     const offsetHorizontal = (options.offset && options.offset.horizontal) || 0;
    //     let left = anchor.left + offsetHorizontal;
    
    //     node.style.left = `${Math.ceil(left)}px`;
    //     node.style.width = 'auto';
    
    //     // Expand the menu width by the scrollbar size, if present.
    //     if (node.scrollHeight >= maxHeight) {
    //         node.style.width = `${2 * node.offsetWidth - node.clientWidth}`;
    //         node.scrollTop = 0;
    //     }
    
    //     // Move left to fit in the window.
    //     const right = node.getBoundingClientRect().right;
    //     if (right > window.innerWidth) {
    //         left -= right - window.innerWidth;
    //         node.style.left = `${Math.ceil(left)}px`;
    //     }
    // }

      app.commands.addCommand(CommandIDs.invokeNotebook, {
        execute: () => {
        console.log("WWWW invoke notebook command pressed");
        //   const panel = editor.currentWidget;
        //   if (panel) {
        //     console.log("WWWW panel exists: ", panel.id);
        //     return app.commands.execute(CommandIDs.invoke, { id: panel.id });
        //   }

        //   let completerWidget = new Widget({node: document.createElement('div')});
        //   completerWidget.addClass('jp-Completer jp-HoverBox');
        
        

        // let editor = FileEditor.editor;

        let node = editorTracker?.currentWidget?.node;
        console.log("node: ", node);
        // let model = FileEditor.model;

        // const start = model.cursor.start;
        // const position = editor.getPositionAt(start) as CodeEditor.IPosition;
        // const position = editor.getCursorPosition();
        // const anchor = editor.getCoordinateForPosition(position) as DOMRect;
        // const style = window.getComputedStyle(node);
        // console.log("style: ", style);
        // const borderLeft = parseInt(style.borderLeftWidth!, 10) || 0;
        // const paddingLeft = parseInt(style.paddingLeft!, 10) || 0;
    
        // // Calculate the geometry of the completer.
        // setGeometry({
        //   anchor,
        //   host: editor.host,
        //   maxHeight: 300,
        //   minHeight: 300,
        //   node: node,
        //   offset: { horizontal: borderLeft + paddingLeft },
        //   privilege: 'below',
        //   style: style
        // });
        //   const main = app.shell.currentWidget;

        //   if (main instanceof MainAreaWidget) {
        //     console.log("inside");
        //     main.contentHeader.addWidget(completerWidget);
        //   }
          
        },
      });

    //   private _createCompletionItemNode(
    //     model: Completer.IModel,
    //     items: CompletionHandler.ICompletionItems
    //   ): HTMLElement | null {
    //     // If there are no items, reset and bail.
    //     if (!items.length) {
    //       this._resetFlag = true;
    //       this.reset();
    //       if (!this.isHidden) {
    //         this.hide();
    //         this._visibilityChanged.emit(undefined);
    //       }
    //       return null;
    //     }
    
    //     // Clear the node.
    //     let node = this.node;
    //     node.textContent = '';
    
    //     // Compute an ordered list of all the types in the typeMap, this is computed
    //     // once by the model each time new data arrives for efficiency.
    //     let orderedTypes = model.orderedTypes();
    
    //     // Populate the completer items.
    //     let ul = document.createElement('ul');
    //     ul.className = 'jp-Completer-list';
    //     for (let item of items) {
    //       if (!this._renderer.createCompletionItemNode) {
    //         return null;
    //       }
    //       let li = this._renderer.createCompletionItemNode(item, orderedTypes);
    //       ul.appendChild(li);
    //     }
    //     node.appendChild(ul);
    //     return node;
    //   }
  
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
        command: CommandIDs.selectNotebook, // id of the command to execute when the binding is matched
        keys: ['Enter'], // default key sequence for the key bineding
        selector: '.jp-FileEditor.jp-mod-completer-active', // CSS Selector for the key binding
      });

      app.commands.addKeyBinding({
        command: CommandIDs.invokeNotebook, // id of the command to execute when the binding is matched
        keys: ['Accel L'], // default key sequence for the key binding
        selector: ".jp-FileEditor .jp-mod-completer-enabled", // CSS Selector for the key binding
      });
    }
  };
  
  export default extension;
  