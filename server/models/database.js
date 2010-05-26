db
  .saveDoc('score', {name: 'Test', points: 10},function(er,ok) {
    if (er) throw new Error(JSON.stringify(er));
    sys.puts("save a document");
  });