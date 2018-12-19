/****** Object:  UserDefinedTableType [dbo].[OfflineMetricObj]    Script Date: 19-12-18 23:26:49 ******/
CREATE TYPE [dbo].[OfflineMetricObj] AS TABLE(
	[ProfileId] [int] NULL,
	[PlaybookId] [int] NULL,
	[PageId] [int] NULL,
	[SectionId] [int] NULL,
	[CompanyId] [int] NULL,
	[UtcTimeStamp] [nvarchar](max) NULL,
	[CreateDate] [datetime] NULL,
	[HitType] [int] NULL,
	[ClientCreateDate] [datetime] NULL,
	[AppVersion] [nvarchar](max) NULL,
	[UserAgent] [nvarchar](max) NULL,
	[ResourceId] [int] NULL
)
GO


ALTER PROCEDURE [dbo].[InsertOfflineAnalyticsData]
  @list AS dbo.OfflineMetricObj READONLY
AS
BEGIN
  SET NOCOUNT ON;

  INSERT INTO OfflineMetrics
    SELECT ProfileId,PlaybookId,PageId,SectionId,
	(case when CompanyId = 0 AND HitType IN(0,2,3,4) THEN ISNULL((SELECT CompanyId FROM Playbooks Where Id = PlaybookId),0) else CompanyId END)
	,UtcTimeStamp,CreateDate,HitType,ClientCreateDate,AppVersion,UserAgent,ISNULL(ResourceId,0)
	FROM @list;
END
