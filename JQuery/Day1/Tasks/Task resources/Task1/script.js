var par = document.getElementById("PAR");

function ChangeFont(font) {
  par.style.fontFamily = font;
}

function ChangeAlign(align) {
  par.style.textAlign = align;
}

function ChangeHeight(height) {
  par.style.lineHeight = height;
}

function ChangeLSpace(space) {
  par.style.letterSpacing = space;
}

function ChangeIndent(indent) {
  par.style.textIndent = indent;
}

function ChangeTransform(transform) {
  par.style.textTransform = transform;
}

function ChangeDecorate(decorate) {
  par.style.textDecoration = decorate;
}

function ChangeBorder(borderStyle) {
  if (borderStyle === "none") {
    par.style.border = "none";
  } else {
    par.style.borderStyle = borderStyle;
    par.style.borderWidth = "3px";
  }
}

function ChangeBorderColor(color) {
  par.style.borderColor = color;
}
