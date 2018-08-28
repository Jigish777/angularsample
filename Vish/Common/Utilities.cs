using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Vish  
{
    public static class Utilities
    {
        public static long CurrentMills()
        {
            return (long)((DateTime.UtcNow - new DateTime(1970, 1, 1)).TotalMilliseconds);
        }

        public static string UniqueName()
        {
            return (string.Format("{0}-{1}", Guid.NewGuid(), CurrentMills()));
        }

        public static string ToStr(this Gender g)
        {
            string GenderString = "";
            switch (g)
            {
                case Gender.Male:
                    GenderString = "Male";
                    break;
                case Gender.Female:
                    GenderString = "Female";
                    break;
                case Gender.Not_To_Disclouse:
                    GenderString = "Not to disclouse";
                    break;
                default:
                    GenderString = "Not to disclouse";
                    break;
            }
            return GenderString;
        }
    }
}