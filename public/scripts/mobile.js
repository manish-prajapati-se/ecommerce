const mobileMenuBtnElement=document.getElementById('mobile-menu-btn');
const mobileMenuElement=document.getElementById('mobile-menu');

function toggleMobileMenu(){
    //adds open class if it doesn't exist and removes it if exists
    mobileMenuElement.classList.toggle('open'); 

}

window.onresize = function() {
    const html=document.querySelector('html');
    const fontSize=parseInt(getComputedStyle(html).fontSize);
    if(window.innerWidth>=48*fontSize){
        console.log('width changed')
        mobileMenuElement.classList.remove('open');
    }
}

mobileMenuBtnElement.addEventListener('click',toggleMobileMenu);