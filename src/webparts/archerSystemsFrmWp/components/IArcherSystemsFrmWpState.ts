export interface IArcherSystemsFrmWpState{ 
  SysId:number;
  Title:string;
  FLevelSupport: string;
  SLevelSupport: string;
  TLevelSupport: string;
  PortfolioLead: any;
  ApplicationSLA: string;
  LaunchURLs: string;    
  Productionhours : string;
  SupportGroup :string;
  UserProvisioning :string;
  ApplicationServers :any;
  DatabaseServers :any[];
  UserDistributionGroup :any;    
  Usedbyorganizationalunit : any;
  UsedinBusinessProcesses :any;
  CustomerFacingServiceName:any;
  AuthType:string;
  Vendor: any;
  BusinessOwner:any[];
  
  KeyProcessOwner:any;
  SuperUsers:any;
  UserManuals:any;
  LicenseCost:any;
  Applicationsupport:string;
  ACP:string;
  ACOA: string;
  ACAS:string;	
  ApplicationCatalogueName:[];
  Environment:string;
  
  ParentSystem:string;
  NETDependency:string;
  UATUsers:any;
  WebApp:any;
  SystemDependency:any;
  DBInstance:any;
  
  
}
