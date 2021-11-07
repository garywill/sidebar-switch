/* Firefox userChrome script
 * Add a slim switch on left of main content to toggle Firefox's native sidebar
 * Tested on Firefox 91
 * Author: garywill (https://garywill.github.io)
 */

// ==UserScript==
// @include         main
// ==/UserScript==

console.log("sidebar_switch.js");

(() => {
    const bbrowser = document.getElementById("browser");
    
    if ( bbrowser && document.getElementById("main-window") && document.getElementById("TabsToolbar") && document.getElementById("urlbar-container") )
    {
        var switcher_c =  document.createElement("vbox"); // TODO XULElement
        var switcher =  document.createElement("vbox");
        
        switcher.id = "sidebar_switcher";
        switcher_c.id = "sidebar_switcher_c";
        
        switcher.tooltipText = "Click to toggle sidebar"
 
        switcher_c.appendChild(switcher);
        bbrowser.insertBefore(switcher_c, bbrowser.childNodes[0]);
        
        switcher.addEventListener('click', async function(){
            await SidebarUI.toggle();
        
        });

        
        Components.utils.import("resource:///modules/CustomizableUI.jsm");
        const {Services} = Components.utils.import("resource://gre/modules/Services.jsm", {});
        const sss = Components.classes["@mozilla.org/content/style-sheet-service;1"].getService(Components.interfaces.nsIStyleSheetService);
        
        const css_ucjs = Services.io.newURI( "data:text/css;charset=utf-8," + encodeURIComponent(`
            #sidebar_switcher_c
            {
                position: relative;
                display: block;
                z-index: 99999;
            }
            #sidebar_switcher 
            { 
                opacity: 0.2;
                width: 6px;
                min-width:6px;
                max-width:6px;
                height: 100%;
                position: absolute;
                background-color:blue;
                
            }
            #sidebar_switcher:hover
            { 
                opacity: 0.3; 
                
            } 
        `), null, null );
        
        sss.loadAndRegisterSheet(css_ucjs, sss.USER_SHEET);
        
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
                switcher_c.style.display = "block";  
            }
            
        });
        tabsbar_fullscr_observer.observe(nav_tb,{attributes:true});
        
        
    }
})();
