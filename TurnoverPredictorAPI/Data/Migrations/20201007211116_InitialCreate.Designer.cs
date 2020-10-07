﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using TurnoverPredictorAPI.Data;

namespace TurnoverPredictorAPI.Data.Migrations
{
    [DbContext(typeof(DataContext))]
    [Migration("20201007211116_InitialCreate")]
    partial class InitialCreate
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "3.0.1");

            modelBuilder.Entity("TurnoverPredictorAPI.Models.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<float>("AnnualIncome")
                        .HasColumnType("REAL");

                    b.Property<string>("BusinessTravel")
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("DateOfBirth")
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("DateOfJoining")
                        .HasColumnType("TEXT");

                    b.Property<string>("Department")
                        .HasColumnType("TEXT");

                    b.Property<float>("DistanceFromHome")
                        .HasColumnType("REAL");

                    b.Property<int>("Education")
                        .HasColumnType("INTEGER");

                    b.Property<string>("EducationField")
                        .HasColumnType("TEXT");

                    b.Property<string>("Email")
                        .HasColumnType("TEXT");

                    b.Property<string>("FirstName")
                        .HasColumnType("TEXT");

                    b.Property<string>("Gender")
                        .HasColumnType("TEXT");

                    b.Property<int>("JobLevel")
                        .HasColumnType("INTEGER");

                    b.Property<string>("JobRole")
                        .HasColumnType("TEXT");

                    b.Property<string>("LastName")
                        .HasColumnType("TEXT");

                    b.Property<int>("ManagerId")
                        .HasColumnType("INTEGER");

                    b.Property<string>("MaritalStatus")
                        .HasColumnType("TEXT");

                    b.Property<int>("NumCompaniesWorked")
                        .HasColumnType("INTEGER");

                    b.Property<byte[]>("PasswordHash")
                        .HasColumnType("BLOB");

                    b.Property<byte[]>("PasswordSalt")
                        .HasColumnType("BLOB");

                    b.Property<float>("PercentSalaryHike")
                        .HasColumnType("REAL");

                    b.Property<int>("StockOptionLevel")
                        .HasColumnType("INTEGER");

                    b.Property<int>("TotalWorkingYears")
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("TurnoverPredictorAPI.Models.UserFeedback", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<DateTime>("Datetime")
                        .HasColumnType("TEXT");

                    b.Property<int>("EnvironmentSatisfaction")
                        .HasColumnType("INTEGER");

                    b.Property<int>("JobSatisfaction")
                        .HasColumnType("INTEGER");

                    b.Property<int>("UserId")
                        .HasColumnType("INTEGER");

                    b.Property<int>("WorkLifeBalance")
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.ToTable("UserFeedbacks");
                });

            modelBuilder.Entity("TurnoverPredictorAPI.Models.UserPerformance", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<DateTime>("Datetime")
                        .HasColumnType("TEXT");

                    b.Property<int>("JobInvolvement")
                        .HasColumnType("INTEGER");

                    b.Property<DateTime>("LastManagerUpdate")
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("LastPromotionUpdate")
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("LastRoleUpdate")
                        .HasColumnType("TEXT");

                    b.Property<int>("ManagerId")
                        .HasColumnType("INTEGER");

                    b.Property<string>("OverTime")
                        .HasColumnType("TEXT");

                    b.Property<int>("PerformanceRating")
                        .HasColumnType("INTEGER");

                    b.Property<int>("TrainingTimesLastYear")
                        .HasColumnType("INTEGER");

                    b.Property<int>("UserId")
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.ToTable("UserPerformances");
                });
#pragma warning restore 612, 618
        }
    }
}