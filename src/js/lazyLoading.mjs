const isIntersecting = entry => {
    return entry.isIntersecting || entry.intersectionRatio > 0;
}

const loadImage = entry => {
    const nodo = entry.target;
    const url = nodo.dataset.src;
    nodo.src = url;
    observer.unobserve(nodo)
}

const observer = new IntersectionObserver(entries => {
    entries.filter(isIntersecting).forEach(loadImage)
});

export const registerImage = imagen => {
    observer.observe(imagen)
}