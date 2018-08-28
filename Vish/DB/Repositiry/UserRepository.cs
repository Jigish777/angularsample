using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.SqlClient;
using System.Linq;
using System.Linq.Expressions;
using System.Web;

namespace Vish.DB
{
    public class UserRepository : IDisposable

    {
        MyContext context = new MyContext();

        private bool disposed = false;

        public IQueryable<User> GetAllUsers()
        {
            return context.Users.Where(t => !t.IsDeleted).Include("Hobbies");
        }

        public IQueryable<User> FindBy(Expression<Func<User, bool>> predicate)
        {
            return context.Users.Where(predicate);
        }
        public User Add(User user)
        {
            user.Hobbies = new List<Hobby>();
            user.CreateAt = DateTime.Now;
            context.Users.Add(user);  
            Save();
            return user;
        }
        public User Update(User user)
        {
            user.Hobbies = new List<Hobby>();
            user.UpdatedAt = DateTime.Now;
            context.Entry(user).State = EntityState.Modified;
            Save();
            return user;
        }

        public void Delete(User user)
        {
            user.IsDeleted = true;
            Update(user);
            Save();

        }


        public IQueryable<Hobby> GetAllHobbies()
        {
            return context.Hobby;
        }

        public int RemoveAndUpdateHobbies(long UserId, string HobbyIds)
        {
            var userIdPara = new SqlParameter { ParameterName = "@UserId", Value = UserId };
            var hobbyIdsPara = new SqlParameter { ParameterName = "@HobbyIds", Value = HobbyIds };
            var result = context.Database.ExecuteSqlCommand("RemoveAndUpdateHobbies @UserId,@HobbyIds", userIdPara, hobbyIdsPara);
            return result;
        }


        public void Save()
        {
            context.SaveChanges();
        }
        protected virtual void Dispose(bool disposing)
        {
            if (!this.disposed)
            {
                if (disposing)
                {
                    context.Dispose();
                }
            }
            this.disposed = true;
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
    }
}