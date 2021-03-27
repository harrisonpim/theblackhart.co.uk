export const baseUrl: string = {
  production: "https://theblackhart.co.uk",
  preview: `https://${process.env.VERCEL_URL}`,
  development: "http://localhost:3000",
}[process.env.VERCEL_ENV];

// export const baseUrl: string = "http://localhost:3000";
// export const baseUrl: string =  "https://theblackhart.co.uk";

export const socialUrl: string = `${baseUrl}/social`;
export const blogUrl: string = `${baseUrl}/blog`;
export const shopUrl: string = `${baseUrl}/shop`;
export const legalUrl: string = `${baseUrl}/legal`;
export const commissionsUrl: string = `${baseUrl}/commissions`;
