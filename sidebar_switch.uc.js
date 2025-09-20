/* Firefox userChrome script
 * Add a slim switch on left of main content to toggle Firefox's native sidebar
 * Tested on Firefox 140
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
        var switcher_c =  document.createElement("vbox");
        var switcher =  document.createElement("vbox");
        
        switcher.id = "sidebar_switcher";
        switcher_c.id = "sidebar_switcher_c";
        
        switcher.tooltipText = "Click to toggle sidebar"
 
        switcher_c.appendChild(switcher);
        bbrowser.insertBefore(switcher_c, bbrowser.childNodes[0]);
        
        switcher.addEventListener('click', async function(event){
            if (event.button === 0) {
                await SidebarController.toggle('viewBookmarksSidebar');
                if ( ! SidebarController.sidebarVerticalTabsEnabled ) {
                    if ( ! SidebarController.isOpen)
                        if (SidebarController.launcherVisible )
                            await SidebarController.handleToolbarButtonClick()
                }
            }
        });
        // Right button clicked
        switcher.addEventListener('contextmenu', async function(event) {
            event.preventDefault();
            if (event.button === 2) {
                await SidebarController.handleToolbarButtonClick('viewBookmarksSidebar')
            }
        });

        // Middle button clicked
        switcher.addEventListener('auxclick', async function(event) {
            event.preventDefault();
            if (event.button === 1) {
                SidebarController.toggleVerticalTabs()
            }
        });

        
        ChromeUtils.importESModule("resource:///modules/CustomizableUI.sys.mjs")
        const Services = globalThis.Services || ChromeUtils.import("resource://gre/modules/Services.jsm").Services;
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
        
        if ( ! sss.sheetRegistered(css_ucjs, sss.USER_SHEET) )
            sss.loadAndRegisterSheet(css_ucjs, sss.USER_SHEET);
        


        const fullscr_toggler = document.getElementById("fullscr-toggler");
        const fullscreen_warning = document.getElementById("fullscreen-warning");
        var tabsbar_fullscr_observer = new MutationObserver(check_status_fullscreen);
        function check_status_fullscreen(){
            if (window.fullScreen)
            {
                // console.log("fuldlscreen !!!");
                if(document.fullscreenElement) // video fullscreen
                {
                    // console.log("fullscreen video");
                    switcher_c.style.display = "none"; //hide
                }
                else // manually browser fullscreen
                {
                    // console.log("fullscreen non-video");
                    switcher_c.style.display = ""; //show
                }
            }
            else // not fullscreen
            {
                // console.log("not fullscreen");
                switcher_c.style.display = ""; //show
            }
        }

        tabsbar_fullscr_observer.observe(fullscr_toggler,{attributes:true});
        tabsbar_fullscr_observer.observe(fullscreen_warning,{attributes:true});
        
        
    }
})();
