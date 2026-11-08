using ProductManagement.Application.DTOs;

namespace ProductManagement.Application.Interfaces;

public interface IProductService
{
    Task<PagedResultDto<ProductDto>> GetAllAsync(int pageNumber, int pageSize);

    Task<ProductDto?> GetByIdAsync(int id);

    Task<ProductDto> CreateAsync(CreateProductDto dto);

    Task<bool> UpdateAsync(int id, UpdateProductDto dto);

    Task<bool> DeleteAsync(int id);
}