package mern_selenium;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;

public class BugSortTest {
	
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
	public void testCanDeleteBug(){
		
	}
	
	@After
	public void cleanUp(){
		try {
			System.out.println("closing browser");
			driver.close();
		} catch (Exception ex) {
			System.out.println(ex.toString());
		}
	}
}
