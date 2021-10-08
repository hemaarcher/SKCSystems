import * as React from 'react';
import styles from './ArcherSystemsFrmWp.module.scss';
import { IArcherSystemsFrmWpProps } from './IArcherSystemsFrmWpProps';
import { IArcherSystemsFrmWpState } from './IArcherSystemsFrmWpState';

import { escape } from '@microsoft/sp-lodash-subset';
import { sp, DateTimeFieldFormatType } from "@pnp/sp/presets/all";
import { Label, PrimaryButton } from 'office-ui-fabric-react';
import { CleanString } from '../../Utilities';



export default class ArcherSystemsFrmWp extends React.Component<IArcherSystemsFrmWpProps, IArcherSystemsFrmWpState> {
  constructor(props: IArcherSystemsFrmWpProps, state: IArcherSystemsFrmWpState) {
    super(props);
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    let qsParam: string;
    let qstitle: string;
    params.has('idval') ? qsParam = params.get("idval") : qsParam = "";
    params.has('titval') ? qstitle = params.get("titval") : qstitle = "";

    this.state = {
      SysId: Number(qsParam),
      Title: "",
      FLevelSupport: "",
      SLevelSupport: "",
      TLevelSupport: "",
      PortfolioLead: "",
      ApplicationSLA: "",
      AuthType: "",
      LaunchURLs: "",
      Productionhours: "",
      SupportGroup: "",
      UserProvisioning: "",
      ApplicationServers: [],
      DatabaseServers: [],
      UserDistributionGroup: [],
      Usedbyorganizationalunit: [],
      UsedinBusinessProcesses: [],
      CustomerFacingServiceName: [],
      Vendor: "",
      BusinessOwner: [],

      KeyProcessOwner: [],
      SuperUsers: [],
      UserManuals: [],
      LicenseCost: [],
      Applicationsupport: "",
      ACP: "",
      ACOA: "",
      ACAS: "",
      ApplicationCatalogueName: [],
      Environment: "",

      ParentSystem: "",
      NETDependency: "",
      UATUsers: [],
      WebApp: false,
      SystemDependency: [],
      
      DBInstance:"",
      
    };

    sp.setup({
      spfxContext: this.props.spcontext
    });

  }
  private  _closeClicked(): void {
    
    window.history.back();
  }
  

  public async componentDidMount() {
    await this._GetDatabaseItem(Number(this.state.SysId));
  }



  private async _GetDatabaseItem(sysid: number) {


    const SysItem: any =
      await sp.web.lists.getByTitle("Systems")
        .items
        .select("*", "Servers/Id", "Servers/Title", "DatabaseServers/Id", "DatabaseServers/Title", "PortfolioLead/EMail", "PortfolioLead/Title", "User_x0020_notification_x0020_di/Id", "User_x0020_notification_x0020_di/Title","Used_x0020_in_x0020_Business_x00/Id","Used_x0020_in_x0020_Business_x00/Title","Vendor0/Id","Vendor0/Title","Vendor0/Id","Vendor0/Title","Key_x0020_Process_x0020_Owner0/Id","Key_x0020_Process_x0020_Owner0/Title","Super_x0020_Users0/Id","Super_x0020_Users0/Title","Business_x0020_Owner0/Id","Business_x0020_Owner0/Title","UAT_x0020_users/Id","UAT_x0020_users/Title","System_x0020_Dependency/Id","System_x0020_Dependency/Title")
        .expand("Servers/Id", "Servers/Title", "DatabaseServers/Id", "DatabaseServers/Title", "PortfolioLead/EMail", "PortfolioLead/Title", "User_x0020_notification_x0020_di/Id", "User_x0020_notification_x0020_di/Title","Used_x0020_in_x0020_Business_x00/Id","Used_x0020_in_x0020_Business_x00/Title","Vendor0/Id","Vendor0/Title","Vendor0/Id","Vendor0/Title","Key_x0020_Process_x0020_Owner0/Id","Key_x0020_Process_x0020_Owner0/Title","Super_x0020_Users0/Id","Super_x0020_Users0/Title","Business_x0020_Owner0/Id","Business_x0020_Owner0/Title","UAT_x0020_users/Id","UAT_x0020_users/Title","System_x0020_Dependency/Id","System_x0020_Dependency/Title")
        .filter(`Id eq ${this.state.SysId}`)
        .get();

    console.log("33");
    console.dir(SysItem[0]);




    this.setState({
      SysId: this.state.SysId,
      Title: SysItem[0].Title,
      FLevelSupport: SysItem[0].OData__x0031_st_x0020_Level_x0020_Supp,
      SLevelSupport: SysItem[0].OData__x0032_nd_x0020_Level_x0020_Supp,
      TLevelSupport: SysItem[0].OData__x0033_rd_x0020_Level_x0020_Supp,
      PortfolioLead: SysItem[0].PortfolioLead?.Title,
      ApplicationSLA: SysItem[0].Service_x0020_Level_x0020_Agreem,

      LaunchURLs: SysItem[0].Launch_x0020_URLs,
      Productionhours: SysItem[0].Production_x0020_hours,
      SupportGroup: SysItem[0].Support_x0020_Group,
     
      NETDependency: SysItem[0].OData__x002e_NET_x0020_Dependancy,
      Usedbyorganizationalunit: SysItem[0].Used_x0020_by_x0020_organization,
      AuthType: SysItem[0].Authentication_x0020_Type,
      ApplicationServers: SysItem[0].Servers,
      UsedinBusinessProcesses:SysItem[0].Used_x0020_in_x0020_Business_x00,
      CustomerFacingServiceName:SysItem[0].Customer_x0020_Facing_x0020_Serv,
      BusinessOwner: SysItem[0].Business_x0020_Owner0,
      DatabaseServers: SysItem[0].DatabaseServers,
      UserDistributionGroup: SysItem[0].User_x0020_notification_x0020_di,
    
      
      KeyProcessOwner:SysItem[0].Key_x0020_Process_x0020_Owner0,
      SuperUsers:SysItem[0].Super_x0020_Users0,
      UserManuals:SysItem[0].User_x0020_Manuals,
      LicenseCost:SysItem[0].License_x0020_Cost,
      Applicationsupport:SysItem[0].Application_x0020_support,
      Environment:SysItem[0].Environment, 
      WebApp:SysItem[0].Web_x0020_App,
      UATUsers:SysItem[0].UAT_x0020_users,      
      SystemDependency:SysItem[0].System_x0020_Dependency,      
      DBInstance:SysItem[0].DB_x0020_Instance,
      
      Vendor :SysItem[0].Vendor0,



    });
console.log("6");

  }






  public render(): React.ReactElement<IArcherSystemsFrmWpProps> {
    return (

      <div className={styles.archerSystemsFrmWp}>
        <div className={styles.mystyles}>
        <span className={styles.btnalignright}>
           <PrimaryButton  text="Back" onClick={this._closeClicked} />
        </span>
        <span><h2>Systems</h2></span>
          <div className={styles.mytablestyles}>
            <table >
              <tr>
                <td className={styles.valTdColspan}>
                  <span> <Label className={styles.mylabel}>Title :</Label></span>
                </td>
                <td>
                  <span> <Label className={styles.valLabel}>{this.state.Title}</Label></span>
                </td>
              </tr>
              <tr>
                <td>
                  <span> <Label className={styles.mylabel}>First Level Support  :</Label></span>
                </td>
                <td>
                  <span> <Label className={styles.valLabel}>{this.state.FLevelSupport}</Label></span>
                </td>
              </tr>
              <tr>
                <td>
                  <span> <Label className={styles.mylabel}>Second Level Support  :</Label></span>
                </td>
                <td>
                  <span> <Label className={styles.valLabel}>{this.state.SLevelSupport}</Label></span>
                </td>
              </tr>
              <tr>
                <td>
                  <span> <Label className={styles.mylabel}>Third Level Support :</Label></span>
                </td>
                <td>
                  <span> <Label className={styles.valLabel}>{this.state.TLevelSupport}</Label></span>
                </td>
              </tr>
              <tr>
                <td>
                  <span> <Label className={styles.mylabel}>Production Hours :</Label></span>
                </td>
                <td>
                  <span> <Label className={styles.valLabel}>{this.state.Productionhours}</Label></span>
                </td>
              </tr>

              <tr>
                <td>
                  <span> <Label className={styles.mylabel}>PortfolioLead:</Label></span>
                </td>
                <td>
                  <span> <Label className={styles.valLabel}>{this.state.PortfolioLead}</Label></span>
                </td>
              </tr>

              <tr>
                <td>
                  <span> <Label className={styles.mylabel}>ApplicationSLA:  :</Label></span>
                </td>
                <td>
                  <span> <Label className={styles.valLabel}>{this.state.ApplicationSLA?.toString()}</Label></span>
                </td>
              </tr>

              <tr>
                <td>
                  <span> <Label className={styles.mylabel}>Authentication Type  :</Label></span>
                </td>
                <td>
                  <span> <Label className={styles.valLabel}>{this.state.AuthType?.toString()}</Label></span>
                </td>
              </tr>             
              <tr>
                <td>
                  <span> <Label className={styles.mylabel}>LaunchURLs:  :</Label></span>
                </td>
                <td>
                  <span className={styles.valLabel}
                   dangerouslySetInnerHTML={{ __html: this.state.LaunchURLs?.toString() }} >
                  </span>
                </td>
              </tr>
              <tr>
                <td>
                  <span> <Label className={styles.mylabel}>Production Hours:  : </Label></span>
                </td>
                <td>
                  <span> <Label className={styles.valLabel}>{this.state.Productionhours}</Label></span>
                </td>
              </tr>
              <tr>
                <td>
                  <span> <Label className={styles.mylabel}>SupportGroup :</Label></span>
                </td>
                <td>
                  <span> <Label className={styles.valLabel}>{this.state.SupportGroup}</Label></span>
                </td>
              </tr>

              <tr>
                <td>
                  <span> <Label className={styles.mylabel}>UserProvisioning :</Label></span>
                </td>
                <td>
                  <span> <Label className={styles.valLabel}>{this.state.UserProvisioning?.replace(/<[^>]+>/g, '')}</Label></span>
                </td>
              </tr>
              <tr>
                <td>
                  <span> <Label className={styles.mylabel}>Application Servers :</Label></span>
                </td>
                <td>
                  <span className={styles.valLabel}>

                    {
                      this.state.ApplicationServers?.map(function (item) {
                        return (<div>
                          {item.Title}
                        </div>);
                      })
                      }


                  </span>
                </td>
              </tr>

              <tr>
                <td>
                  <span> <Label className={styles.mylabel}>Database Servers :</Label></span>
                </td>
                <td>
                
                  <span className={styles.valLabel}>

                    {
                      this.state.DatabaseServers?.map(function (item) {
                        return (<div>
                          {item.Title}
                        </div>);
                      })}
                  </span>
                </td>
              </tr>

              <tr>
                <td>
                  <span> <Label className={styles.mylabel}>User Distribution Group :</Label></span>
                </td>
                <td>
                  <span className={styles.valLabel}>
                    {
                      this.state.UserDistributionGroup?.map(function (item) {
                        return (<div>
                          {item.Title}
                        </div>);
                      })}
                  </span>
                </td>
              </tr>


              <tr>
                <td>
                  <span> <Label className={styles.mylabel}>Used by Organization Unit:</Label></span>
                </td>
                <td>
                <span className={styles.valLabel}> 
                  { 
                      this.state.Usedbyorganizationalunit?.map(function(item){                  
                        return (<div > 
                        {item}
                          </div>); 
                      })} 
                      
                  </span>
                
                </td>
              </tr>
              
              <tr>
                <td>
                  <span> <Label className={styles.mylabel}>Used in Business Processes:</Label></span>
                </td>
                <td>
                <span className={styles.valLabel}> { 
                      this.state.UsedinBusinessProcesses?.map(function(item){                  
                        return (<div> 
                        {item.Title}
                          </div>); 
                      })} 
                      
                  </span>
                </td>
              </tr>
              
              <tr>
                <td>
                  <span> <Label className={styles.mylabel}>Customer Facing Service Name :</Label></span>
                </td>
                <td>
                  <span> <Label className={styles.valLabel}>{this.state.CustomerFacingServiceName}</Label></span>
                </td>
              </tr>
              <tr>
                <td>
                  <span> <Label className={styles.mylabel}>Vendor :</Label></span>
                </td>
                <td>
                <span className={styles.valLabel}>                    
                  </span>
                </td>
              </tr>
           
              <tr>
                <td>
                  <span> <Label className={styles.mylabel}>Key Process Owner :</Label></span>
                </td>
                <td>
                  <span className={styles.valLabel}> 
                  { 
                      this.state.KeyProcessOwner?.map(function(item){                  
                        return (<div> 
                        {item.Title}
                          </div>); 
                      })} 
               </span>
                </td>
              </tr>
              <tr>
                <td>
                  <span> <Label className={styles.mylabel}>Super Users :</Label></span>
                </td>
                <td>
                <span className={styles.valLabel}> { 
                      this.state.SuperUsers?.map(function(item){                  
                        return (<div> 
                        {item.Title}
                          </div>); 
                      })}                       
                  </span>
            
                
                </td>
              </tr>
              <tr>
                <td>
                  <span> <Label className={styles.mylabel}>User Manual :</Label></span>
                </td>
                <td>
                <span  className={styles.valLabel} dangerouslySetInnerHTML={{ __html: this.state.UserManuals }} />
                </td>
              </tr>
              
              <tr>
                <td>
                  <span> <Label className={styles.mylabel}>License Cost :</Label></span>
                </td>
                <td>
                  <span> <Label className={styles.valLabel}>{this.state.LicenseCost}</Label></span>
                </td>
              </tr>
              <tr>
                <td>
                  <span> <Label className={styles.mylabel}>Application Support :</Label></span>
                </td>
                <td>
                  <span className={styles.valLabel}  dangerouslySetInnerHTML={{ __html: this.state.Applicationsupport?.toString() }}>
                  </span>                  
                </td>
              </tr>                       
              <tr>
                <td>
                  <span> <Label className={styles.mylabel}>Business Owner :</Label></span>
                </td>
                <td>                  
                  <span className={styles.valLabel}> { 
                      this.state.BusinessOwner?.map(function(item){                  
                        return (<div> 
                        {item.Title}
                          </div>); 
                      })} 
                      
                  </span>
                
                   
                </td>
              </tr>               
              <tr>
                <td>
                  <span> <Label className={styles.mylabel}>Application Catalogue Name:</Label></span>
                </td>
                <td>
                  <span className={styles.valLabel}> 
                  {this.state.ApplicationCatalogueName?.toString()}
                    </span>
                </td>
              </tr>
              <tr>
                <td>
                  <span> <Label className={styles.mylabel}>Environment:</Label></span>
                </td>
                <td>
                  <span> <Label className={styles.valLabel}>{this.state.Environment}</Label></span>
                </td>
              </tr><tr>
                <td>
                  <span> <Label className={styles.mylabel}>.Net Dependency</Label></span>
                </td>
                <td>
                  <span> <Label className={styles.valLabel}>{this.state.NETDependency}</Label></span>
                </td>
              </tr>
              <tr>
                <td>
                  <span> <Label className={styles.mylabel}>UAT Users</Label></span>
                </td>
                <td>
                  <span className={styles.valLabel}>

                    {
                      this.state.UATUsers?.map(function (item) {
                        return (<div>
                          {item.Title}
                        </div>);
                      })
                      }
                  </span>
                </td>
              </tr>
              <tr>
                <td>
                  <span> <Label className={styles.mylabel}>Web App</Label></span>
                </td>
                <td>
                  <span> <Label className={styles.valLabel}>{this.state.WebApp}</Label></span>
                </td>
              </tr>
              
              <tr>
                <td>
                  <span> <Label className={styles.mylabel}>System Dependency :</Label></span>
                </td>
                <td>
                  <span className={styles.valLabel}>

                    {
                      this.state.SystemDependency?.map(function (item) {
                        return (<div>
                          {item.Title}
                        </div>);
                      })}


                  </span>
                </td>
              </tr>
              <tr>
                <td>
                  <span> <Label className={styles.mylabel}>DB Instance</Label></span>
                </td>
                <td>
                  <span> <Label className={styles.valLabel}>{this.state.DBInstance}</Label></span>
                </td>
              </tr>
              
      

            </table>
          </div>

        </div>
      </div>
    );
  }
}
