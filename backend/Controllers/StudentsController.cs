using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using StudentManagementSystem.Models;
using StudentManagementSystem.Services.Interfaces;

namespace StudentManagementSystem.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class StudentsController : ControllerBase
    {
        private readonly IStudentService _service;

        public StudentsController(IStudentService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var students = await _service.GetAllStudentsAsync();

            return Ok(new
            {
                success = true,
                message = "Students fetched successfully",
                data = students
            });
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var student = await _service.GetStudentByIdAsync(id);

            if (student == null)
            {
                return NotFound(new
                {
                    success = false,
                    message = "Student not found"
                });
            }

            return Ok(new
            {
                success = true,
                message = "Student fetched successfully",
                data = student
            });
        }

        [HttpPost]
        public async Task<IActionResult> Add(Student student)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new
                {
                    success = false,
                    message = "Invalid student data",
                    errors = ModelState
                });
            }

            var result = await _service.AddStudentAsync(student);

            return Ok(new
            {
                success = true,
                message = "Student added successfully",
                data = result
            });
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, Student student)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new
                {
                    success = false,
                    message = "Invalid student data",
                    errors = ModelState
                });
            }

            var result = await _service.UpdateStudentAsync(id, student);

            if (result == null)
            {
                return NotFound(new
                {
                    success = false,
                    message = "Student not found"
                });
            }

            return Ok(new
            {
                success = true,
                message = "Student updated successfully",
                data = result
            });
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var result = await _service.DeleteStudentAsync(id);

            if (!result)
            {
                return NotFound(new
                {
                    success = false,
                    message = "Student not found"
                });
            }

            return Ok(new
            {
                success = true,
                message = "Student deleted successfully"
            });
        }
    }
}