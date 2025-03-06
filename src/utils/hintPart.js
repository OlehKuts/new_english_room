export  const hintPart = (value, modificationFn) => {
    const hint = value.includes(" ") ? "phrase" : 
    value.includes("ий") || value.includes("ій") ? "adjective" : 
    value.includes("ти") ? "verb" : false;
    if (!hint) return;
    modificationFn(hint)
  }