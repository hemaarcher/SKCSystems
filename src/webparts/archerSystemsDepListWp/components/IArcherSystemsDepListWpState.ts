export interface IArcherSystemsDepListWpState {
    sysItems: SystemsItem[];    
    columns: any;
    qsId:string;
    
    }

    


export interface SystemsItem{ 
  Id:number;
  Title :string;
  PortfolioLead:string;
  Servers: any;
  DatabaseServers : any;
  TechnicalNotes :string;
  SystemDependencies: any; 
}