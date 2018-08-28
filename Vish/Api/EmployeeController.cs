using AutoMapper;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using Vish.DB;

namespace Vish.Api
{
    public class EmployeeController : ApiController
    {

        [HttpPost]
        public HttpResponseMessage Post(User u)
        {
            UserDto userDto = new UserDto();
            using (UserRepository urepo = new UserRepository())
            {
                var selectedHobbies = u.Hobbies;
                var hobbyIds = selectedHobbies != null && selectedHobbies.Count > 0 ? String.Join("|", selectedHobbies.Select(t => t.Id)) : "";
                urepo.Add(u);
                urepo.RemoveAndUpdateHobbies(u.Id, hobbyIds);
                u.Hobbies = selectedHobbies;
                userDto = Mapper.Map<UserDto>(u);
                if (userDto != null)
                {
                    userDto.StrCreateDate = userDto.CreateAt != null ? userDto.CreateAt.Value.ToString("MM-dd-yyyy hh:mm:ss") : "";
                    userDto.StrUpdateDate = userDto.UpdatedAt != null ? userDto.UpdatedAt.Value.ToString("MM-dd-yyyy hh:mm:ss") : "";
                    userDto.StrGender = userDto.Gender.ToStr();
                }
            }
            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, userDto);
            return response;
        }


        [Route("api/Employee/AddEmployeeWithPhoto")]
        [HttpPost]
        public HttpResponseMessage AddEmployeeWithPhoto()
        {
            var re = HttpContext.Current.Request;
            var server = HttpContext.Current.Server;
            UserDto userDto = new UserDto();
            using (UserRepository urepo = new UserRepository())
            {
                User u = JsonConvert.DeserializeObject<User>(re.Params["emp"]);
                UploadFile(u);

                var selectedHobbies = u.Hobbies;
                var hobbyIds = selectedHobbies != null && selectedHobbies.Count > 0 ? String.Join("|", selectedHobbies.Select(t => t.Id)) : "";
                urepo.Add(u);
                urepo.RemoveAndUpdateHobbies(u.Id, hobbyIds);
                u.Hobbies = selectedHobbies;
                userDto = Mapper.Map<UserDto>(u);
                if (userDto != null)
                {
                    userDto.StrCreateDate = userDto.CreateAt != null ? userDto.CreateAt.Value.ToString("MM-dd-yyyy hh:mm:ss") : "";
                    userDto.StrUpdateDate = userDto.UpdatedAt != null ? userDto.UpdatedAt.Value.ToString("MM-dd-yyyy hh:mm:ss") : "";
                    userDto.StrGender = userDto.Gender.ToStr();
                }
            }
            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, userDto);
            return response;
        }

        

        [HttpPut]
        public HttpResponseMessage Put(User u)
        {
            UserDto userDto = new UserDto();
            using (UserRepository urepo = new UserRepository())
            {
                var selectedHobbies = u.Hobbies;
                var hobbyIds = selectedHobbies != null && selectedHobbies.Count > 0 ? String.Join("|", selectedHobbies.Select(t => t.Id)) : "";
                //UploadFile(u);
                urepo.Update(u);
                urepo.RemoveAndUpdateHobbies(u.Id, hobbyIds);
                u.Hobbies = selectedHobbies;
                userDto = Mapper.Map<UserDto>(u);
                if (userDto != null)
                {
                    userDto.StrCreateDate = userDto.CreateAt != null ? userDto.CreateAt.Value.ToString("MM-dd-yyyy hh:mm:ss") : "";
                    userDto.StrUpdateDate = userDto.UpdatedAt != null ? userDto.UpdatedAt.Value.ToString("MM-dd-yyyy hh:mm:ss") : "";
                    userDto.StrGender = userDto.Gender.ToStr();
                }

            }
            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, userDto);
            return response;
        }

        [Route("api/Employee/UpdateEmployeeWithPhoto")]
        [HttpPut]
        public HttpResponseMessage UpdateEmployeeWithPhoto()
        {
            var re = System.Web.HttpContext.Current.Request;
            var server = System.Web.HttpContext.Current.Server;
            UserDto userDto = new UserDto();
            using (UserRepository urepo = new UserRepository())
            {
                User u = JsonConvert.DeserializeObject<User>(re.Params["emp"]);
                bool IsPicUpdated = re.Params["IsPicUpdated"]!=null?Convert.ToBoolean(re.Params["IsPicUpdated"]) : false;

                if (IsPicUpdated)
                {
                    UploadFile(u);
                    string OldProfilePic = re.Params["OldProfilePic"] != null ? re.Params["OldProfilePic"] : "";
                    if (!string.IsNullOrEmpty(OldProfilePic))
                    {
                        DeleteFile(OldProfilePic, false);
                    }

                }
                var selectedHobbies = u.Hobbies;
                var hobbyIds = selectedHobbies != null && selectedHobbies.Count > 0 ? String.Join("|", selectedHobbies.Select(t => t.Id)) : "";
                urepo.Update(u);
                urepo.RemoveAndUpdateHobbies(u.Id, hobbyIds);
                u.Hobbies = selectedHobbies;
                userDto = Mapper.Map<UserDto>(u);
                if (userDto != null)
                {
                    userDto.StrCreateDate = userDto.CreateAt != null ? userDto.CreateAt.Value.ToString("MM-dd-yyyy hh:mm:ss") : "";
                    userDto.StrUpdateDate = userDto.UpdatedAt != null ? userDto.UpdatedAt.Value.ToString("MM-dd-yyyy hh:mm:ss") : "";
                    userDto.StrGender = userDto.Gender.ToStr();
                }

            }
            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, userDto);
            return response;
        }

        [HttpDelete]
        public HttpResponseMessage Delete(int Id)
        {
            using (UserRepository urepo = new UserRepository())
            {
                User u = urepo.FindBy(t => t.Id == Id).FirstOrDefault();
                if (u != null)
                {
                    urepo.Delete(u);
                }
            }
            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK);
            return response;
        }

        [Route("api/Employee/GetAll")]
        [HttpGet]
        public HttpResponseMessage GetAll()
        {
            List<UserDto> users = new List<UserDto>();
            using (UserRepository urepo = new UserRepository())
            {
                var result = urepo.GetAllUsers().ToList();
                if (result.Count > 0)
                {
                    users = Mapper.Map<List<UserDto>>(result);
                    users.ForEach(t =>
                    {
                        t.StrCreateDate = t.CreateAt != null ? t.CreateAt.Value.ToString("MM-dd-yyyy hh:mm:ss") : "";
                        t.StrUpdateDate = t.UpdatedAt != null ? t.UpdatedAt.Value.ToString("MM-dd-yyyy hh:mm:ss") : "";
                    });
                }
            }
            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, users);
            return response;
        }

        [Route("api/Employee/GetAllWithHobbies")]
        [HttpGet]
        public HttpResponseMessage GetAllWithHobbies(int PageNo = 0,int PageSize =0,string SortBy= "Id", string SorOrder="desc")
        { 
            List<UserDto> users = new List<UserDto>();
            List<Hobby> hobbies = new List<Hobby>();
            using (UserRepository urepo = new UserRepository())
            {
                
                var result = SortUsers(urepo.GetAllUsers(), SortBy, SorOrder).ToList();
                if (result.Count > 0)
                {
                    users = Mapper.Map<List<UserDto>>(result);
                    users.ForEach(t =>
                    {
                        t.StrCreateDate = t.CreateAt != null ? t.CreateAt.Value.ToString("MM-dd-yyyy hh:mm:ss") : "";
                        t.StrUpdateDate = t.UpdatedAt != null ? t.UpdatedAt.Value.ToString("MM-dd-yyyy hh:mm:ss") : "";
                        t.StrGender = t.Gender.ToStr();
                    });
                }

                hobbies = urepo.GetAllHobbies().ToList();
            }
            var userWithHobbies = new { Users = users, Hobbies = hobbies };
            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, userWithHobbies);
            return response;
        }
        private IQueryable<User> SortUsers(IQueryable<User> userlist, string SortBy, string SortOrder)
        {

            switch (SortBy)
            {
                case "Id":
                    if (string.Equals(SortOrder.ToLower().Trim(), "desc"))
                    {
                        userlist =  userlist.OrderByDescending(t => t.Id);
                    }
                    else
                    {
                        userlist = userlist.OrderBy(t => t.Id);
                    }
                    break;
                case "FirstName":
                    if (string.Equals(SortOrder.ToLower().Trim(), "desc"))
                    {
                        userlist = userlist.OrderByDescending(t => t.FirstName);
                    }
                    else
                    {
                        userlist = userlist.OrderBy(t => t.FirstName);
                    }
                    
                    break;
                case "LastName":
                    if (string.Equals(SortOrder.ToLower().Trim(), "desc"))
                    {
                        userlist = userlist.OrderByDescending(t => t.LastName);
                    }
                    else
                    {
                        userlist = userlist.OrderBy(t => t.LastName);
                    }
                    break;
                case "Email":
                    if (string.Equals(SortOrder.ToLower().Trim(), "desc"))
                    {
                        userlist = userlist.OrderByDescending(t => t.Email);
                    }
                    else
                    {
                        userlist = userlist.OrderBy(t => t.Email);
                    }
                    break;
                case "Type":
                    if (string.Equals(SortOrder.ToLower().Trim(), "desc"))
                    {
                        userlist = userlist.OrderByDescending(t => t.Type);
                    }
                    else
                    {
                        userlist = userlist.OrderBy(t => t.Type);
                    }
                    break;
                default:
                    userlist = userlist.OrderBy(t => t.Id);
                    break;
            }

            return userlist;
        }
        private void UploadFile(User u)
        {
            try
            {
                var re = HttpContext.Current.Request;
                var server = HttpContext.Current.Server;
                u.ProfilePic = string.Empty;
                var ProfileFile = re.Files["ProfilePic"];
                if (ProfileFile != null && ProfileFile.ContentLength > 0)
                {
                    string FolderName = "/Images/";
                    if (!Directory.Exists(server.MapPath("~" + FolderName)))
                    {
                        Directory.CreateDirectory(server.MapPath("~" + FolderName));
                    }
                    string extension = Path.GetExtension(ProfileFile.FileName);
                    var fileName = Utilities.UniqueName() + extension;

                    var fullFilePath =FolderName + fileName;
                    ProfileFile.SaveAs(server.MapPath("~"+fullFilePath));
                    u.ProfilePic = fullFilePath;
                }
                else
                {
                    u.ProfilePic = string.Empty;
                }
            }
            catch (Exception ex)
            {
                Elmah.ErrorSignal.FromCurrentContext().Raise(ex);
                u.ProfilePic = string.Empty;
            }   
        }
        private void DeleteFile(string FilePath,bool IsAbsolutePath)
        {
            try
            {
                if (!IsAbsolutePath)
                {
                    File.Delete(HttpContext.Current.Server.MapPath(FilePath));
                }
                else
                {
                    File.Delete(FilePath);
                }
            }
            catch (Exception ex)
            {
                Elmah.ErrorSignal.FromCurrentContext().Raise(ex); //ELMAH Signaling
            }
        }
    }
}
