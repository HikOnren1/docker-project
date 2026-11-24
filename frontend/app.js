fetch('/api/items')
  .then(r => r.json())
  .then(items => {
    const ul = document.getElementById('items');
    items.forEach(it => {
      const li = document.createElement('li');
      li.textContent = `#${it.id} — ${it.name}`;
      ul.appendChild(li);
    });
  })
  .catch(err => {
    document.getElementById('items').textContent = 'Ошибка: ' + err;
  });