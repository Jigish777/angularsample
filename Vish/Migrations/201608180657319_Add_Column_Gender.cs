namespace Vish.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Add_Column_Gender : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Employees", "Gender", c => c.Int(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Employees", "Gender");
        }
    }
}
