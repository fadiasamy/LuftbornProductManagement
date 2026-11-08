using Microsoft.AspNetCore.Mvc;
using ProductManagement.Application.DTOs;
using ProductManagement.Application.Interfaces;
using System.ComponentModel.DataAnnotations;

namespace ProductManagement.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProductsController : ControllerBase
{
    private readonly IProductService _productService;

    public ProductsController(IProductService productService)
    {
        _productService = productService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll([FromQuery, Range(1, int.MaxValue)] int pageNumber = 1, [FromQuery, Range(1, 100)] int pageSize = 5)
    {
        var products = await _productService.GetAllAsync(pageNumber, pageSize);

        return Ok(products);
    }

    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetById(int id)
    {
        var product = await _productService.GetByIdAsync(id);

        if (product is null)
            return NotFound();

        return Ok(product);
    }

    [HttpPost]
    public async Task<IActionResult> Create(CreateProductDto dto)
    {
        var product = await _productService.CreateAsync(dto);

        return CreatedAtAction(nameof(GetById),new { id = product.Id },product);
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> Update(int id,UpdateProductDto dto)
    {
        var result = await _productService.UpdateAsync(id, dto);

        if (!result)
            return NotFound();

        return NoContent();
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        var result = await _productService.DeleteAsync(id);

        if (!result)
            return NotFound();

        return NoContent();
    }
    
}