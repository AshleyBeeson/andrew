package mern_selenium;

import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

import org.junit.Before;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.interactions.Actions;

public class BugCreateTest {
	WebDriver driver;
	WebElement element;
	
	@Before
	public void setup() {
		
		System.setProperty("webdriver.chrome.driver","C:\\Users\\Administrator\\Documents\\Java\\Selenium\\Selenium\\chromedriver.exe");

		ChromeOptions options = new ChromeOptions();
		options.addArguments("--start-maximized");
		driver = new ChromeDriver(options);
		driver.get("http://localhost:8084/Bugtracker");
	}	
	
	public void wait(int time) {
		try {
			Thread.sleep(time);
		} catch (InterruptedException e) 
		{
			e.printStackTrace();
		}
	}
	
	
	@Test
	public void testCanCreateBug() {
		wait(2000);
		driver.findElement(By.xpath("//*[@id=\"domMain\"]/div/div[1]/div/a/p")).click();
		wait(2000);
		
		//issueid
		driver.findElement(By.name("issueID")).sendKeys("ISSUE-00030");
		wait(1000);
		driver.findElement(By.xpath("//*[@id=\"CNBF-summary\"]")).sendKeys("Testing via selenium");
		wait(1000);
		driver.findElement(By.xpath("//*[@id=\"CNBF-description\"]")).sendKeys("description goes here!");
		wait(1000);
		driver.findElement(By.xpath("//*[@id=\"CNBF-hp\"]")).click();
		//severity radios
		wait(1000);
		driver.findElement(By.xpath("//*[@id=\"CNBF-low\"]")).click();
		wait(1000);
		driver.findElement(By.xpath("//*[@id=\"CNBF-med\"]")).click();
		wait(1000);
		driver.findElement(By.xpath("//*[@id=\"CNBF-high\"]")).click();
		wait(1000);
		driver.findElement(By.xpath("//*[@id=\"CNBF-reporter\"]")).sendKeys("Andrew");
		wait(1000);
		driver.findElement(By.xpath("//*[@id=\"CNBF-assignedUser\"]")).sendKeys("Andrew");
		wait(1000);
		//
		driver.findElement(By.xpath("//*[@id=\"CNBF-dropdown\"]")).click();
		wait(1000);
		driver.findElement(By.xpath("//*[@id=\"CNBF-dropdown\"]/option[2]")).click();
		wait(1000);
		driver.findElement(By.xpath("//*[@id=\"CNBF-dropdown\"]")).click();
		wait(1000);
		driver.findElement(By.xpath("//*[@id=\"domMain\"]/div/div[2]/div[2]/form/input")).submit();
		wait(5000);
		//assert it was created
		assertTrue(driver.getPageSource().contains("Testing via selenium"));
		wait(5000);
		//Scroll down
		JavascriptExecutor jse = (JavascriptExecutor)driver;
		jse.executeScript("window.scrollBy(0,250)", "");
		
	/*	String summText = driver.findElement(By.xpath("//*[@id=\"domMain\"]/div/div[3]/div[1]/div/div[2]/div[8]/div[1]/div[1]/div[3]/p")).toString();
		System.out.println(summText);
		assertEquals(summText,"Testing via selenium");*/
		wait(3000);
		
	}

	@Test
	public void testCanDeleteBug(){
/*		JavascriptExecutor js = (JavascriptExecutor) driver;
        js.executeScript("javascript:window.scrollBy(250,350)");
        */
		WebElement delBut = driver.findElement(By.xpath("//*[@id=\"domMain\"]/div/div[3]/div[1]/div/div[2]/div[8]/div[1]/div[1]/div[7]/div/a"));
		
		Actions actions = new Actions(driver);
		actions.moveToElement(delBut);
		actions.perform();
		
		wait(2000);
		delBut.click();
		wait(5000);
		assertFalse(driver.getPageSource().contains("Testing via selenium"));
		System.out.println("false?");
		wait(3000);
	}

}
