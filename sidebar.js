function alternarSidebar() {
  const sidebar = document.getElementById("sidebar");
  sidebar.classList.toggle("show");
}
function rolarCarrossel(direcao) {
  const carrossel = document.getElementById('carrossel');
  const larguraCard = carrossel.querySelector('.card').offsetWidth + 20; // 20 = gap
  carrossel.scrollBy({
    left: direcao * larguraCard,
    behavior: 'smooth'
  });
}