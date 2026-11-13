// Don't get confused, it's staging for production and for test/development use "test" dataset
// So if dataset is "staging" it's production and if "test" it's test/development

export const isProduction = process.env.SANITY_STUDIO_DATASET === "staging";
