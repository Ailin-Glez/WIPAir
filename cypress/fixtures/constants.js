const TARGET = 'dev';
const ENV_VARS = Cypress.env().env;

export const maxTimeout = 30000;
export const credentials = {
   email: ENV_VARS[TARGET].credentials.admin.email,
   password: ENV_VARS[TARGET].credentials.admin.password
}

export const proposalTypes = {
   liveBundles: "Live Bundles",
   custom: "Custom",
   accessoryOnly: "Accessory Only",
   flexJob: "FlexJob"
}