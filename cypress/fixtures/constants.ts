const TARGET = 'dev';
const ENV_VARS = Cypress.env().env;

export const maxTimeout = 30000;
export const credentials = {
   email: ENV_VARS[TARGET].credentials.admin.email,
   password: ENV_VARS[TARGET].credentials.admin.password
};

export enum ProposalTypes {
   liveBundles = 'Live Bundles',
   custom = 'Custom',
   accessoryOnly = 'Accessory Only',
   flexJob = 'FlexJob'
}

export enum ProposalNames {
   Best = 0,
   Better,
   Good,
   Repair
}

export enum ButtonStatus {
   enabled = 'enabled',
   disabled = 'disabled'
}
