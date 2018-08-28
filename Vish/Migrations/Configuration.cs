namespace Vish.Migrations
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<DB.MyContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(DB.MyContext context)
        {
            //int userCount = context.Users.Count();
            //if (userCount == 0)
            //{
            //    context.Users.Add(new DB.User
            //    {
            //        FirstName = "Ajay",
            //        LastName = "Raval",
            //        Email = "araval@argusoft.com",
            //        Password = "123",
            //        IsDeleted = false,
            //        Type = UserType.Admin,
            //        CreateAt = DateTime.Now
            //    });
            //}
            //context.Hobby.AddRange(new DB.Hobby[] {
            //    new DB.Hobby {
            //        Name="Reading"
            //    },
            //    new DB.Hobby {
            //        Name="Writing"
            //    },
            //    new DB.Hobby {
            //        Name="Swimming"
            //    },
            //    new DB.Hobby {
            //        Name="Cricket"
            //    }
            //});


            //context.SaveChanges();
        }
    }
}
