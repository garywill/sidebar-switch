// tested on firefox 68
console.log("sidebar_switch.js");

(() => {
    const bbrowser = document.getElementById("browser");
    
    if ( bbrowser && document.getElementById("main-window") && document.getElementById("TabsToolbar") && document.getElementById("urlbar-container") )
    {
        var switcher =  document.createElement("vbox");
        
        switcher.id = "sidebar_switcher";
        switcher.style.width="6px";
        switcher.style.minWidth="6px";
        switcher.style.maxWidth="6px";
        
        switcher.addEventListener('click', function(){
            SidebarUI.toggle();
        });
        
        bbrowser.insertBefore(switcher, bbrowser.childNodes[0]);
        
        
        const nav_tb = document.getElementById("navigator-toolbox");
        var tabsbar_fullscr_observer = new MutationObserver(function(){
            if(nav_tb.getAttribute("inFullscreen")) // fullscreen
            {
                if(document.fullscreen) // video fullscreen
                {   
                    switcher.style.display = "none"; // hide
                }
            }
            else // not fullscreen
            {
                switcher.style.display = "";  
            }
            
        });
        tabsbar_fullscr_observer.observe(nav_tb,{attributes:true});
        

    }
})();
