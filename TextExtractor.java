package com.example.databaseinsert;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.HashSet;
import java.util.Set;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class TextExtractor {

	public static void main(String[] args) {
		String filePath = ""; // Replace this with your file path

		Set<String> uniqueMatches = new HashSet<>();

		try (BufferedReader reader = new BufferedReader(new FileReader(filePath))) {
			String line;
			Pattern pattern = Pattern.compile("ispmdev\\.db_ispm\\.(\\w+)");

			while ((line = reader.readLine()) != null) {
				Matcher matcher = pattern.matcher(line);
				if (matcher.find()) {
					String match = matcher.group(1);
					if (!uniqueMatches.contains(match)) {
						System.out.println(match);
						uniqueMatches.add(match);
					}
				}
			}
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}
