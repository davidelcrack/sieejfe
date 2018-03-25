import { Component, OnInit, AfterContentInit, ContentChildren, QueryList, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { TabComponent } from '../tab/tab.component';
import { DynamicTabsDirective } from '../dynamic-tabs.directive';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css']
})
export class TabsComponent implements AfterContentInit {


  contextmenu = false;
  contextmenuX = 0;
  contextmenuY = 0;
  tabContextMenu = undefined;

  //activates the menu with the coordinates
  onrightClick(event,tab){
    console.log('onrightClick : entro a onrightClick');
      this.contextmenuX=event.clientX
      this.contextmenuY=event.clientY
      this.contextmenu=true;
      this.tabContextMenu=tab;
  }
  //disables the menu
  disableContextMenu(){
      this.contextmenu= false;
  }

  onCerrarNotify(e){
    console.log('onCerrarNotify : entro a onCerrarNotify', e);
    this.closeTab(e);
  }

  onCerrarTodasNotify(e){
    console.log('onCerrarTodasNotify : entro a onCerrarTodasNotify', e);
    this.closeAllTabs();
  }

  closeAllTabs(){
    console.log(this.dynamicTabs);
    let dynamicLenght=this.dynamicTabs.length;
    this.dynamicTabs=[];    
    for(let i=0; i<dynamicLenght;i++) {             
        // destroy our dynamically created component again
        let viewContainerRef = this.dynamicTabPlaceholder.viewContainer;
        // let viewContainerRef = this.dynamicTabPlaceholder;
        viewContainerRef.remove(i);                
    }
    this.selectTab(this.tabs.first);     
  }

  onCerrarDemasNotify(e){
    console.log('onCerrarDemasNotify : entro a onCerrarDemasNotify', e);
    this.cerrarDemas(e);
  }

  cerrarDemas(tab){
    let tam=this.dynamicTabs.length-1;
    for(let i=0; i<tam;i++) {
      
        let eliminado =this.dynamicTabs.indexOf(this.dynamicTabs.find(function(element){
          return element != tab;
        }));
        // remove the tab from our array
        this.dynamicTabs.splice(eliminado,1);
        
        // destroy our dynamically created component again
        let viewContainerRef = this.dynamicTabPlaceholder.viewContainer;
        // let viewContainerRef = this.dynamicTabPlaceholder;
        viewContainerRef.remove(eliminado);
        
        // set tab index to 1st one
        this.selectTab(this.tabs.first);
      
    }
  }

  dynamicTabs: TabComponent[] = [];
  
  @ContentChildren(TabComponent) 
  tabs: QueryList<TabComponent>;
  
  @ViewChild(DynamicTabsDirective)
  dynamicTabPlaceholder: DynamicTabsDirective;
  
  /*
    Alternative approach of using an anchor directive
    would be to simply get hold of a template variable
    as follows
  */
  // @ViewChild('container', {read: ViewContainerRef}) dynamicTabPlaceholder;
  
  constructor(private _componentFactoryResolver: ComponentFactoryResolver) {}
  
  // contentChildren are set
  ngAfterContentInit() {
    // get all active tabs
    let activeTabs = this.tabs.filter((tab)=>tab.active);
    
    // if there is no active tab set, activate the first
    if(activeTabs.length === 0) {
      this.selectTab(this.tabs.first);
    }
  }
  
  openTab(title: string, template, data, isCloseable) {
    // get a component factory for our TabComponent
    let componentFactory = this._componentFactoryResolver.resolveComponentFactory(TabComponent);
    
    // fetch the view container reference from our anchor directive
    let viewContainerRef = this.dynamicTabPlaceholder.viewContainer;
    
    // alternatively...
    // let viewContainerRef = this.dynamicTabPlaceholder;
    
    // create a component instance
    let componentRef = viewContainerRef.createComponent(componentFactory);

    // set the according properties on our component instance
    let instance: TabComponent = componentRef.instance as TabComponent;
    instance.title = title;
    instance.template = template;
    instance.dataContext = data;
    instance.isCloseable = isCloseable;
    
    // remember the dynamic component for rendering the
    // tab navigation headers
    this.dynamicTabs.push(componentRef.instance as TabComponent);
    
    // set it active
    this.selectTab(this.dynamicTabs[this.dynamicTabs.length - 1]);
  }
  
  selectTab(tab: TabComponent){
    console.log('SelectTab : entro a selectTab' , this.dynamicTabs);
    // deactivate all tabs
    this.tabs.toArray().forEach(tab => tab.active = false);
    this.dynamicTabs.forEach(tab => tab.active = false);
    
    // activate the tab the user has clicked on.
    tab.active = true;
  }
  
  closeTab(tab: TabComponent) {
    for(let i=0; i<this.dynamicTabs.length;i++) {
      if(this.dynamicTabs[i] === tab) {
        // remove the tab from our array
        this.dynamicTabs.splice(i,1);
        
        // destroy our dynamically created component again
        let viewContainerRef = this.dynamicTabPlaceholder.viewContainer;
        // let viewContainerRef = this.dynamicTabPlaceholder;
        viewContainerRef.remove(i);
        
        // set tab index to 1st one
        this.selectTab(this.tabs.first);
        break;
      }
    }
  }
  
  closeActiveTab() {
    let activeTabs = this.dynamicTabs.filter((tab)=>tab.active);
    if(activeTabs.length > 0)  {
      // close the 1st active tab (should only be one at a time)
      this.closeTab(activeTabs[0]);
    }
  }

}
