export const toggleDarkMode = () => {
  const body = document.body;
  body.classList.toggle('dark-mode');

  // 現在のモードをローカルストレージに保存
  if (body.classList.contains('dark-mode')) {
    localStorage.setItem('theme', 'dark');
    console.log('Dark mode enabled'); // ダークモードが有効になったことをログに出力
  } else {
    localStorage.setItem('theme', 'light');
    console.log('Light mode enabled'); // ライトモードが有効になったことをログに出力
  }
};

export const applyTheme = () => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
    console.log('Dark mode applied'); // ダークモードが適用されたことをログに出力
  } else {
    console.log('Light mode applied'); // ライトモードが適用されたことをログに出力
  }
};
