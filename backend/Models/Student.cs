using System.ComponentModel.DataAnnotations;

namespace StudentManagementSystem.Models
{
    public class Student
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Student name is required")]
        [StringLength(100)]
        public string Name { get; set; }

        [Required(ErrorMessage = "Email is required")]
        [EmailAddress(ErrorMessage = "Enter valid email address")]
        public string Email { get; set; }

        [Range(18, 60, ErrorMessage = "Age must be between 18 and 60")]
        public int Age { get; set; }

        [Required(ErrorMessage = "Course is required")]
        [StringLength(100)]
        public string Course { get; set; }

        public DateTime CreatedDate { get; set; } = DateTime.UtcNow;
    }
}