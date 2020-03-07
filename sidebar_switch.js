/* Firefox userChrome script
 * Tested on Firefox 68
 * Author: garywill (https://github.com/garywill)
 * https://github.com/garywill/sidebar-switch
 */

console.log("sidebar_switch.js");

(() => {
    const bbrowser = document.getElementById("browser");
    
    if ( bbrowser && document.getElementById("main-window") && document.getElementById("TabsToolbar") && document.getElementById("urlbar-container") )
    {
        var switcher_c =  document.createElement("vbox");
        var switcher =  document.createElement("vbox");
        
        switcher.id = "sidebar_switcher";
        switcher_c.id = "sidebar_switcher_c";
 
        switcher_c.style.position = "relative";
        
        switcher.style.width="6px";
        switcher.style.minWidth="6px";
        switcher.style.maxWidth="6px";
        switcher.style.position = "absolute";
        switcher.style.backgroundColor = "blue"; 
        
        // in css file
        //switcher.style.opacity = "0.2";
        
        switcher.tooltipText = "Click to toggle sidebar"
 
        switcher_c.appendChild(switcher);
        bbrowser.insertBefore(switcher_c, bbrowser.childNodes[0]);
        
        switcher.addEventListener('click', async function(){
            await SidebarUI.toggle();
            /*
            if (SidebarUI.isOpen) 
            {
                switcher_c.style.position = "";
            } 
            else 
            {
                switcher_c.style.position = "relative";
            }
            */
        });
        
        
        const nav_tb = document.getElementById("navigator-toolbox");
        var tabsbar_fullscr_observer = new MutationObserver(function(){
            if(nav_tb.getAttribute("inFullscreen")) // fullscreen
            {
                if(document.fullscreen) // video fullscreen
                {   
                    switcher_c.style.display = "none"; // hide
                }
            }
            else // not fullscreen
            {
                switcher_c.style.display = "";  
            }
            
        });
        tabsbar_fullscr_observer.observe(nav_tb,{attributes:true});
        
        window.addEventListener('resize', function(){
            switcher.style.height = bbrowser.boxObject.height + "px";
        });
    }
})();

