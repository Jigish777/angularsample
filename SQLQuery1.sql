USE [TestDb]
GO
/****** Object:  StoredProcedure [dbo].[RemoveAndUpdateHobbies]    Script Date: 29/08/2018 12:37:07 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROCEDURE [dbo].[RemoveAndUpdateHobbies]
@UserId BIGINT,
@HobbyIds nvarchar(max)
AS
BEGIN
Delete From UserHobbies Where UserId = @UserId
Insert into UserHobbies 
Select  @UserId,items from [fnSplitString](@HobbyIds,'|')
END

