// export function getWord() {
//   var sel, word = "";
//   if (window.getSelection && (sel = window.getSelection()).modify) {
//       // console.log("sel before: ", sel);
//       var selectedRange = sel.getRangeAt(0);
//       console.log("selectedRange: ", selectedRange);

//       sel.collapseToStart();
//       console.log("sel: ", sel.toString());
//       sel.modify("move", "backward", "word");
//       sel.modify("extend", "forward", "word");
//       word = sel.toString();
      
//       // Restore selection
//       sel.removeAllRanges();
//       sel.addRange(selectedRange);
//   } else if ( (sel = document.selection) && sel.type != "Control") {
//       console.log("goes secnod first if");
//       var range = sel.createRange();
//       range.collapse(true);
//       range.expand("word");
//       word = range.text;
//   }
//   console.log("word: ", word);
// }

function getPos(elt) {
  if (elt.isContentEditable) {  // for contenteditable
      console.log("inside getPos");
      elt.focus();
      let _range = document.getSelection().getRangeAt(0);
      let range = _range.cloneRange();
      range.selectNodeContents(elt);
      range.setEnd(_range.endContainer, _range.endOffset)
      return range.toString().length;
  } else {  // for texterea/input element
      return elt.selectionStart;
  }
}

function setPos(elt, pos) {
  if (elt.isContentEditable) {  // for contenteditable
      elt.target.focus();
      document.getSelection().collapse(elt.target, pos);
  } else {  // for texterea/input element
      elt.target.setSelectionRange(pos, pos);
  }
}

function insertText(content) {
  document.execCommand('insertText', false, content) 
}

// export function getWord(e) {
//   console.log("target: ", e.target.value);
     
//   if (e.key == 'w') {
//       e.preventDefault();
//       console.log("e: ", e);
//       console.log(getPos(e.target));
      
//       let endingIndex = getPos(e.target);
//       let startingIndex = endingIndex && endingIndex - 1;
//       let value = e.target.isContentEditable ? e.target.innerHTML : e.target.value;
//       let regex = /[ ]/;

//       while (startingIndex) {
//           if (regex.test(value[startingIndex])) {
//               ++startingIndex;
//               break;
//           }
//           --startingIndex;
//       }
//       console.log('word before cursor: ' + value.substring(startingIndex, endingIndex));
//   }
// };


// export function getWord(e) { 
//   if( e.key == "w") {
//     e.preventDefault();
//     console.log("inside here");
//     let endingIndex = e.target.selectionStart;
//     let startingIndex = endingIndex && endingIndex - 1;
//     let value = e.target.value;
//     // putt all delemeters in it by which word can be splitted
//     let regex = /[ ]/;

//     while(startingIndex > -1){
//       if(regex.test(value[startingIndex])){
//         ++startingIndex;
//         break;
//       }
//       --startingIndex;
//   }

//   // note you will have you apply check to avoid negative index
//   if(startingIndex < 0) {
//       startingIndex = 0;
//   }
//   console.log(value.substring(startingIndex, endingIndex));

//   let newText = "replaced";
//   value = value.substring(0, startingIndex) + newText + value.substring(endingIndex);
//   let cursorPosition = startingIndex + newText.length;
//   e.target.value = value;
//   e.target.setSelectionRange(cursorPosition, cursorPosition);
// }
// }


// ATTEMPT 1: 
// didn't work bc it only gives you the word if you trigger document.selection() immediately after typing
// doesn't work if you move the cursor back
// var newText = 'hello\nnewline';
// var newHtml = '<b>test</b> and<br>a <a href="hjkh">link</a>';

export function getWord(e) {
  var elt = e.target;
  // console.log("inside getWord");
      if (e.key == "w") {
          e.preventDefault();
          elt.focus();
          // console.log("document selection: ", document.getSelection());
          let sel = window.getSelection();
          // console.log("sel: ", sel.toString());
          // I have to type soomething in to register the cursor?
          sel.modify("extend", "backward", "word");
          console.log("sel modify: ", sel.toString());
          let range2 = document.createRange();
          let refNode = document.getElementsByClassName("CodeMirror-line")[0];
          range2.selectNodeContents(refNode);
          sel.addRange(range2);

          // console.log("inside content editable");
          let range = sel.getRangeAt(0);
          console.log("get s range container: ", range.startContainer);
          console.log("get e range container: ", range.endContainer);
          // console.log("get s range: ", range.startOffset);
          // console.log("get e range: ", range.endOffset);
          console.log("getRange: ", range.toString().trim());
          // range.deleteContents();
          // var el = document.createElement("div");
          // el.innerHTML = newText;
          // var frag = document.createDocumentFragment(), node;
          // while (node = el.firstChild) {
          //     frag.appendChild(node);
          // }
          // range.insertNode(frag);
          // range.collapse();
          // console.log("done");
      }
  }
