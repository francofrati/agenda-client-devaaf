export type Business = {
    businessName: string;
    businessId?: string;
    services?: Array<BusinessService>
}
type BusinessService = {
    serviceName: string;
    servicePrice: number;
    serviceId: string
}