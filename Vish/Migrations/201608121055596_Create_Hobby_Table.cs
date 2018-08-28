namespace Vish.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Create_Hobby_Table : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Hobbies",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.UserHobbies",
                c => new
                    {
                        UserId = c.Long(nullable: false),
                        HobbyId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => new { t.UserId, t.HobbyId })
                .ForeignKey("dbo.Employees", t => t.UserId, cascadeDelete: true)
                .ForeignKey("dbo.Hobbies", t => t.HobbyId, cascadeDelete: true)
                .Index(t => t.UserId)
                .Index(t => t.HobbyId);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.UserHobbies", "HobbyId", "dbo.Hobbies");
            DropForeignKey("dbo.UserHobbies", "UserId", "dbo.Employees");
            DropIndex("dbo.UserHobbies", new[] { "HobbyId" });
            DropIndex("dbo.UserHobbies", new[] { "UserId" });
            DropTable("dbo.UserHobbies");
            DropTable("dbo.Hobbies");
        }
    }
}
