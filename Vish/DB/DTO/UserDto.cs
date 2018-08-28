using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace Vish.DB
{
    public class UserDto
    {
        
        public long Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public UserType Type { get; set; }
        public bool IsDeleted { get; set; }
        public DateTime? CreateAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public string ProfilePic { get; set; }
        public virtual List<Hobby>Hobbies { get; set; }
        public string StrCreateDate { get; set; }
        public string StrUpdateDate{ get; set; }
        public Gender Gender { get; set; }
        public string StrGender { get; set; }

    }
}