using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using Vish.Migrations;

namespace Vish.DB
{ 
    public class MyContext :DbContext
    {
        public MyContext() : base(nameOrConnectionString:"TestDb")
        {
            Configuration.ProxyCreationEnabled = false;
        }
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            //base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<User>()
                        .HasMany(s => s.Hobbies)
                        .WithMany()
                        .Map(uh =>
                        {
                            uh.MapLeftKey("UserId");
                            uh.MapRightKey("HobbyId");
                            uh.ToTable("UserHobbies");
                        });
            Database.SetInitializer(new MigrateDatabaseToLatestVersion<MyContext, Configuration>());
        }
        public DbSet<User> Users { get; set; }
        public DbSet<Hobby> Hobby{ get; set; }

    }
}