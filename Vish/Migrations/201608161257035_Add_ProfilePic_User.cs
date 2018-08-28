namespace Vish.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Add_ProfilePic_User : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Employees", "ProfilePic", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.Employees", "ProfilePic");
        }
    }
}
