import * as React from 'react';
import styles from './ArcherSystemsDepListWp.module.scss';
import { IArcherSystemsDepListWpProps } from './IArcherSystemsDepListWpProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { sp } from "@pnp/sp/presets/all";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import { IColumn, ITheme, mergeStyleSets, getTheme, getFocusStyle, List, ImageFit, Image, DetailsList, Link, DetailsListLayoutMode, SelectionMode, Tooltip, Separator } from 'office-ui-fabric-react';
import { IArcherSystemsDepListWpState, SystemsItem } from './IArcherSystemsDepListWpState';



export default class ArcherSystemsDepListWp extends React.Component<IArcherSystemsDepListWpProps, IArcherSystemsDepListWpState> {
  constructor(props: IArcherSystemsDepListWpProps, state: IArcherSystemsDepListWpState) {
  
    super(props);

    const columns: IColumn[] = [
      {
        key: "Title",
        name: "Title",
        fieldName: "Title",
        minWidth: 70,
        maxWidth: 90,
        isResizable: true,
        data: "string",
        isPadded: true,
        className:styles.mylabel,
      },
      {
        key: "PortfolioLead",
        name: "PortfolioLead",
        fieldName: "PortfolioLead",
        minWidth: 100,
        maxWidth: 100,
        isResizable: true,
        data: "any",
        isPadded: true,
        className:styles.mylabel,
      },
      {
        key: "Servers",
        name: "Servers",
        fieldName: "Servers",
        minWidth: 70,
        maxWidth: 120,
        isRowHeader: true,
        isResizable: true,
        data: "any",
        isPadded: true,
        className:styles.mylabel,
      },
      {
        key: "DatabaseServers",
        name: "DatabaseServers",
        fieldName: "DatabaseServers",
        minWidth: 70,
        maxWidth: 120,
        isRowHeader: true,
        isResizable: true,
        data: "any",
        isPadded: true,
        className:styles.mylabel,
      },
      {
        key: "TechnicalNotes",
        name: "TechnicalNotes",
        fieldName: "TechnicalNotes",
        minWidth: 70,
        maxWidth: 120,
        isRowHeader: true,
        isResizable: true,
        data: "any",
        isPadded: true,
        className:styles.mylabel,
      },
      {
        key: "SystemDependencies",
        name: "SystemDependencies",
        fieldName: "SystemDependencies",
        minWidth: 70,
        maxWidth: 90,
        isRowHeader: true,
        isResizable: true,
        data: "any",
        isPadded: true,
        className:styles.mylabel,
      },
      
    ];

    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    let qsParam: string;
    params.has('idval') ? qsParam = params.get("idval") : qsParam = "";
    
    
    
    this.state = {
      sysItems: [],   
      columns: columns,
      qsId:qsParam,
    };


    sp.setup({
      spfxContext: this.props.spcontext
    });
    
  }
  
  public async componentDidMount() {
    await this.getSystemsSysDepData();
  }


  public async getSystemsSysDepData() {
        // use odata operators for more efficient queries
    let qsTit:string;

      let numId:number =Number(this.state.qsId);
      console.log("num id is "+numId);
      const sysTitle = await sp.web.lists.getByTitle("Systems")
      .items.getById(numId)
      .select("Title").get();  

      qsTit= sysTitle?.Title.trim();

    console.log(qsTit);
console.log(this.state.qsId);
   
    const sysdata: SystemsItem[] = [];
    const sysitems: any[] =
      await sp.web.lists.getByTitle("Systems")
      .items
      .select("*", "Servers/Id", "Servers/Title", "DatabaseServers/Id", "DatabaseServers/Title","PortfolioLead/EMail", "PortfolioLead/Title" ,"System_x0020_Dependency/Id","System_x0020_Dependency/Title")        
      .expand("Servers/Id", "Servers/Title", "DatabaseServers/Id", "DatabaseServers/Title","PortfolioLead/EMail", "PortfolioLead/Title","System_x0020_Dependency/Id","System_x0020_Dependency/Title")        
      .filter(`System_x0020_Dependency eq ${this.state.qsId}`)   
        .get();
        console.log("4");
        console.dir(sysitems);
         
//filter(`substringof('${qsTit}',System_x0020_Dependency/Title)"`)
//filter(`System_x0020_Dependency eq ${this.state.qsId}`) 
      //.filter(`substringof('${qsTit}',System_x0020_Dependency)"`)  
        await sysitems.forEach(async sysitem => {
          await sysdata.push({
        Id: Number(this.state.qsId),
        Title: sysitem.Title,
        PortfolioLead: sysitem.PortfolioLead?.Title,
        Servers: sysitem.Servers,
        DatabaseServers: sysitem.DatabaseServers,
        TechnicalNotes: sysitem.Technical_x0020_Notes,
        SystemDependencies: sysitem.System_x0020_Dependency,   

      });
    });
   
    this.setState({ sysItems: sysdata });
         
  }

  public _onRenderItemColumn = (item: SystemsItem, index: number, column: IColumn): JSX.Element | string => {

    switch (column.key) {
      case 'Title':
        return <span style={{ whiteSpace: 'normal' }}>{item.Title}</span>;

      case 'PortfolioLead':
        return <span style={{ whiteSpace: 'normal' }} >{item.PortfolioLead}</span>;

     

        case 'Servers':
          let serversarr = [];
          item.Servers?.forEach(p => {
            serversarr.push({ key: p.Id, text: p.Title });
          });
  
          return (
            item.Servers?.map(({ Id, Title }) => (
              <span>{Title}<br/></span>
            ))
          );

          

      case 'DatabaseServers':
        let dbserversarr = [];
        item.DatabaseServers?.forEach(p => {
          dbserversarr.push({ key: p.Id, text: p.Title });
        });

        return (
          item.DatabaseServers?.map(({ Id, Title }) => (
            <span>{Title}<br/></span>
          ))
        );

        case 'TechnicalNotes':
          return <span style={{ whiteSpace: 'normal' }} >{item.TechnicalNotes}</span>;
          case 'SystemDependencies':
               
            let dpserversarr = [];
        item.SystemDependencies?.forEach(p => {
          dpserversarr.push({ key: p.Id, text: p.Title });
        });

        return (
          item.SystemDependencies?.map(({ Id, Title }) => (
            <span>{Title}<br/></span>
          ))
        );


      default:
        return <span>{item.Title}</span>;
    }
  }

  public render(): React.ReactElement<IArcherSystemsDepListWpProps> {
    return (
      <div className={ styles.archerSystemsDepListWp }>
      <Separator alignContent="start" color="red"><span className={styles.mylabel}>System Dependencies</span></Separator>
  
     <div className={ styles.mystyles }>
    
       <DetailsList
           items={this.state.sysItems}
           columns={this.state.columns}
           setKey="set"
           layoutMode={DetailsListLayoutMode.justified}
           isHeaderVisible={true}
           onRenderItemColumn={this._onRenderItemColumn}
           selectionMode={SelectionMode.none} />
       </div>
     </div>
  

    );
  }
}
