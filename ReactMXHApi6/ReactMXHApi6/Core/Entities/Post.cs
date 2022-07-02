using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ReactMXHApi6.Core.Entities
{
    public class Post
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string NoiDung { get; set; } = null;
        public string VideoUrl { get; set; }
        public DateTime Created { get; set; } = DateTime.Now;
        public AppUser User { get; set; }
        public string UserId { get; set; }
        public ICollection<Comment> Comments { get; set; } = new List<Comment>();
    }
}
