using Microsoft.Extensions.DependencyInjection;
using ProductManagement.Application.Services;
using ProductManagement.Application.Interfaces;


namespace ProductManagement.Application;

public static class DependencyInjection
{
    public static IServiceCollection AddApplication(this IServiceCollection services)
    {
        services.AddScoped<IProductService, ProductService>();

        return services;
    }
}