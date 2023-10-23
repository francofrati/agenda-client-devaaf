export type Business = {
    businessName: string;
    services?: Array<BusinessServices>
}
type BusinessServices = {
    serviceName: string;
    servicePrice: number
}