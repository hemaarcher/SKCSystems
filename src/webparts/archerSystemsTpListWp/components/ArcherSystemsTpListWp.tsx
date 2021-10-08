import * as React from 'react';
import styles from './ArcherSystemsTpListWp.module.scss';
import { IArcherSystemsTpListWpProps } from './IArcherSystemsTpListWpProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { sp } from "@pnp/sp/presets/all";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import { IColumn, ITheme, mergeStyleSets, getTheme, getFocusStyle, List, ImageFit, Image, DetailsList, Link, DetailsListLayoutMode, SelectionMode, Tooltip, Separator } from 'office-ui-fabric-react';

import { SPHttpClient } from '@microsoft/sp-http';
import { IArcherSystemsTpListWpState, TPItem } from './IArcherSystemsTpListWpState';


export default class ArcherSystemsTpListWp extends React.Component<IArcherSystemsTpListWpProps, IArcherSystemsTpListWpState> {
  constructor(props: IArcherSystemsTpListWpProps, state: IArcherSystemsTpListWpState) {


    super(props);
    const columns: IColumn[] = [
      {
        key: "FullName",
        name: "Title",
        fieldName: "Title",
        minWidth: 70,
        maxWidth: 90,
        isResizable: true,
        data: "string",
        isPadded: true,
        className: styles.mylabel,
      },
      {
        key: "Email",
        name: "Email",
        fieldName: "E_x002d_Mail",
        minWidth: 100,
        maxWidth: 100,
        isResizable: true,
        data: "string",
        isPadded: true,
        className: styles.mylabel,
      },
      {
        key: "RolenTitle",
        name: "Role/Title",
        fieldName: "Title_x002f_Rol",
        minWidth: 70,
        maxWidth: 90,
        isRowHeader: true,
        isResizable: true,
        data: "string",
        isPadded: true,
        className: styles.mylabel,
      },
      {
        key: "Company",
        name: "Company",
        fieldName: "Company",
        minWidth: 70,
        maxWidth: 90,
        isRowHeader: true,
        isResizable: true,
        data: "string",
        isPadded: true,
        className: styles.mylabel,
      },


    ];


    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    let qsParam: string;
    params.has('idval') ? qsParam = params.get("idval") : qsParam = "";



    this.state = {
      tpItems: [],
      columns: columns,
      qsId: qsParam,
    };

    sp.setup({
      spfxContext: this.props.spcontext
    });



  }



  public async componentDidMount() {
    await this.getSysnTPreferenceData();
  }

  public async getSysnTPreferenceData() {


    const tpdata: TPItem[] = [];
    const tpitems: any[] =
      await sp.web.lists.getByTitle("3rd party contacts")
        .items
        .filter(`SystemRefId eq ${this.state.qsId}`)
        .get();

    console.log(tpitems);



    await tpitems.forEach(async tpitem => {
      await tpdata.push({
        Id: 377,
        FullName: tpitem.Title,
        Email: tpitem.E_x002d_Mail,
        RolenTitle: tpitem.Title_x002f_Rol,
        Company: tpitem.Company,
      });
    });

    this.setState({ tpItems: tpdata });
  }


  public _onRenderItemColumn = (item: TPItem, index: number, column: IColumn): JSX.Element | string => {

    switch (column.key) {
      case 'FullName':
        return <span style={{ whiteSpace: 'normal' }}>{item.FullName}</span>;

      case 'Email':
        return <span style={{ whiteSpace: 'normal' }} >{item.Email}</span>;

      case 'RolenTitle':
        return <span style={{ whiteSpace: 'normal' }} >{item.RolenTitle}</span>;

      case 'Company':
        return <span style={{ whiteSpace: 'normal' }} >{item.Company}</span>;


      default:
        return <span>{item.FullName}</span>;
    }
  }



  public render(): React.ReactElement<IArcherSystemsTpListWpProps> {
    return (
      <div className={ styles.archerSystemsTpListWp }>
      <Separator alignContent="start" color="red"><span className={styles.mylabel}>3rd Party Contacts</span></Separator>
  
     <div className={ styles.mystyles }>
       <div className={ styles.row }>
            <DetailsList
              items={this.state.tpItems}
              columns={this.state.columns}
              setKey="set"
              layoutMode={DetailsListLayoutMode.justified}
              isHeaderVisible={true}
              onRenderItemColumn={this._onRenderItemColumn}
              selectionMode={SelectionMode.none} />
          </div>
        </div>
      </div>

    );
  }
}
