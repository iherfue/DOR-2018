TOPBAR = {};
TOPBAR.expandedHeight   = 435;
TOPBAR.div              = document.getElementById('navigation-top-bar-image');
TOPBAR.originalHeight   = 60;
TOPBAR.open             = false;
TOPBAR.opacity          = 0.95;
TOPBAR.div.style.transition = 'height .5s';
document.getElementById('navigation-top-bar-hamburger').onclick = function (e)
{
if (!TOPBAR.open) {
TOPBAR.div.style.opacity = TOPBAR.opacity;
TOPBAR.div.style.height  = TOPBAR.expandedHeight + 'px';
TOPBAR.open = true;
TOPBAR.div.onclick = function (e)
{
e.stopPropagation();
}
window.onclick = function ()
{
TOPBAR.div.style.height = TOPBAR.originalHeight + 'px';
TOPBAR.div.onclick = null;
TOPBAR.open = false;
}
e.stopPropagation();
} else {
TOPBAR.div.style.height = TOPBAR.originalHeight + 'px';
TOPBAR.open = false;
}
}
