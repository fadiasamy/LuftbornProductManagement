

using ProductManagement.Domain.Entities;
using ProductManagement.Application.DTOs;

namespace ProductManagement.Application.Interfaces
{
    public interface IProductRepository
    {
        Task<PagedResultDto<Product>> GetAllAsync(int pageNumber, int pageSize);

        Task<Product?> GetByIdAsync(int id);

        Task AddAsync(Product product);

        Task UpdateAsync(Product product);

        Task DeleteAsync(Product product);

    }
}
