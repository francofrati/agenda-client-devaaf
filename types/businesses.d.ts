export type Business = {
    businessName: string;
    businessId?: string;
    services?: Array<BusinessServices>
}
type BusinessServices = {
    serviceName: string;
    servicePrice: number
}